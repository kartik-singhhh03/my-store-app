import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(
  request: NextRequest,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
): { success: boolean; remaining: number; resetTime: number } {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const key = `${ip}:${request.nextUrl.pathname}`
  const now = Date.now()

  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + windowMs
    }
    return {
      success: true,
      remaining: limit - 1,
      resetTime: store[key].resetTime
    }
  }

  store[key].count++

  if (store[key].count > limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: store[key].resetTime
    }
  }

  return {
    success: true,
    remaining: limit - store[key].count,
    resetTime: store[key].resetTime
  }
}