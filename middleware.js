import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is authenticated for protected routes
        const { pathname } = req.nextUrl;
        
        // Define protected routes
        const protectedRoutes = ['/addProduct', '/manage-product'];
        
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/addProduct/:path*', '/manage-product/:path*']
};