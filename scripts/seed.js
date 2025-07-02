const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kartik-digital-store'

async function seed() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db()
    
    // Clear existing data
    await db.collection('users').deleteMany({})
    await db.collection('products').deleteMany({})
    await db.collection('orders').deleteMany({})
    await db.collection('blogposts').deleteMany({})
    
    console.log('Cleared existing data')
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    const adminUser = await db.collection('users').insertOne({
      name: 'Admin User',
      email: 'admin@kartikdigitalstore.com',
      password: hashedPassword,
      role: 'admin',
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    console.log('Created admin user')
    
    // Create sample customer
    const customerPassword = await bcrypt.hash('customer123', 12)
    const customerUser = await db.collection('users').insertOne({
      name: 'John Doe',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'customer',
      emailVerified: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    console.log('Created customer user')
    
    // Create sample products
    const products = [
      {
        title: 'React E-commerce Template',
        description: 'Complete e-commerce solution built with React, TypeScript, and Tailwind CSS. Features include product catalog, shopping cart, user authentication, and payment integration.',
        price: 49.99,
        category: 'templates',
        coverImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
        fileUrl: 'https://example.com/files/react-ecommerce.zip',
        fileName: 'react-ecommerce-template.zip',
        fileSize: 15728640, // 15MB
        tags: ['react', 'typescript', 'ecommerce', 'tailwind'],
        isActive: true,
        downloadCount: 124,
        rating: 4.8,
        reviews: 45,
        createdBy: adminUser.insertedId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Next.js SaaS Starter Kit',
        description: 'Production-ready SaaS application template with authentication, billing, and dashboard. Built with Next.js 14, Prisma, and Stripe.',
        price: 99.99,
        category: 'templates',
        coverImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        fileUrl: 'https://example.com/files/nextjs-saas.zip',
        fileName: 'nextjs-saas-starter.zip',
        fileSize: 25165824, // 24MB
        tags: ['nextjs', 'saas', 'stripe', 'prisma'],
        isActive: true,
        downloadCount: 89,
        rating: 4.9,
        reviews: 32,
        createdBy: adminUser.insertedId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'UI Component Library',
        description: '50+ beautiful React components with TypeScript support and Storybook documentation. Includes forms, navigation, data display, and feedback components.',
        price: 29.99,
        category: 'components',
        coverImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        fileUrl: 'https://example.com/files/ui-components.zip',
        fileName: 'ui-component-library.zip',
        fileSize: 8388608, // 8MB
        tags: ['react', 'components', 'typescript', 'storybook'],
        isActive: true,
        downloadCount: 203,
        rating: 4.7,
        reviews: 78,
        createdBy: adminUser.insertedId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    const insertedProducts = await db.collection('products').insertMany(products)
    console.log('Created sample products')
    
    // Create sample blog posts
    const blogPosts = [
      {
        title: 'Getting Started with React and TypeScript',
        slug: 'getting-started-with-react-and-typescript',
        content: `<h2>Introduction</h2><p>React and TypeScript make a powerful combination for building modern web applications. In this guide, we'll explore how to set up a new project and leverage TypeScript's type safety features.</p><h2>Setting Up Your Project</h2><p>Start by creating a new React project with TypeScript support:</p><pre><code>npx create-react-app my-app --template typescript</code></pre><p>This command creates a new React application with TypeScript configuration already set up.</p>`,
        excerpt: 'Learn how to combine React with TypeScript for better development experience and type safety.',
        tags: ['react', 'typescript', 'tutorial'],
        isPublished: true,
        author: adminUser.insertedId,
        views: 1250,
        metaTitle: 'Getting Started with React and TypeScript - Complete Guide',
        metaDescription: 'Learn how to set up and use React with TypeScript for better development experience and type safety.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Building Scalable Web Applications with Next.js',
        slug: 'building-scalable-web-applications-with-nextjs',
        content: `<h2>Why Next.js?</h2><p>Next.js provides a robust framework for building production-ready React applications. With features like server-side rendering, static site generation, and API routes, it's perfect for scalable web applications.</p><h2>Key Features</h2><ul><li>Server-side rendering (SSR)</li><li>Static site generation (SSG)</li><li>API routes</li><li>Automatic code splitting</li><li>Built-in CSS support</li></ul>`,
        excerpt: 'Discover how Next.js can help you build scalable and performant web applications.',
        tags: ['nextjs', 'react', 'ssr', 'performance'],
        isPublished: true,
        author: adminUser.insertedId,
        views: 890,
        metaTitle: 'Building Scalable Web Applications with Next.js',
        metaDescription: 'Learn how to use Next.js features like SSR, SSG, and API routes to build scalable web applications.',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ]
    
    await db.collection('blogposts').insertMany(blogPosts)
    console.log('Created sample blog posts')
    
    console.log('\n✅ Seed data created successfully!')
    console.log('\n📧 Admin credentials:')
    console.log('Email: admin@kartikdigitalstore.com')
    console.log('Password: admin123')
    console.log('\n📧 Customer credentials:')
    console.log('Email: customer@example.com')
    console.log('Password: customer123')
    
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await client.close()
  }
}

seed()