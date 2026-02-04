import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export default async function Proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

if (request.nextUrl.pathname.startsWith('/admin')) {
  console.log("--- DEBUG ADMIN ---");
  console.log("Email user:", user?.email);
  console.log("Metadata completa:", JSON.stringify(user?.app_metadata));
  
  if (!user || user.app_metadata?.role !== 'admin') {
     console.log("ACCES REFUZAT: Rolul 'admin' lipsește.");
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|checkout|plata-reusita|multumesc|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}