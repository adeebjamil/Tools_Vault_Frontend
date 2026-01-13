
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // We cannot read localStorage here. 
    // This middleware is a placeholder if you decide to move to Cookies later.
    // For now, we rely on client-side protection in the AdminLayout.
    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
