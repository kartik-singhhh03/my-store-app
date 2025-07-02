import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Check if user is admin for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (req.nextauth.token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Check if user is authenticated for protected routes
    if (req.nextUrl.pathname.startsWith('/dashboard') || 
        req.nextUrl.pathname.startsWith('/orders') ||
        req.nextUrl.pathname.startsWith('/checkout')) {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/api/auth') ||
            req.nextUrl.pathname.startsWith('/api/products') ||
            req.nextUrl.pathname.startsWith('/api/blog') ||
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname.startsWith('/products') ||
            req.nextUrl.pathname.startsWith('/blog') ||
            req.nextUrl.pathname.startsWith('/auth')) {
          return true
        }

        // For protected routes, check if user is authenticated
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/orders/:path*',
    '/checkout/:path*',
    '/api/admin/:path*',
    '/api/checkout/:path*',
    '/api/download/:path*'
  ]
}