import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import connectDB from './mongodb'
import User from './models/User'

// Create a lazy connection that only connects when needed
const getMongoClient = async () => {
  const client = new MongoClient(process.env.MONGODB_URI!)
  await client.connect()
  return client
}

// Create a promise that resolves to the client when needed
const clientPromise = getMongoClient()

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await connectDB()
        
        const user = await User.findOne({ email: credentials.email }).select('+password')
        
        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      
      // Handle Google OAuth user role assignment
      if (account?.provider === 'google' && user) {
        await connectDB()
        const dbUser = await User.findOne({ email: user.email })
        if (dbUser) {
          token.role = dbUser.role
          token.id = dbUser._id.toString()
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        await connectDB()
        
        const existingUser = await User.findOne({ email: user.email })
        
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            avatar: user.image,
            role: 'customer',
            emailVerified: new Date()
          })
        }
      }
      
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup'
  }
}