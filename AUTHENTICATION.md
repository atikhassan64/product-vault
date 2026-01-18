# Authentication System Documentation

## Overview
This Next.js application uses NextAuth.js for complete authentication with both Google OAuth and credentials-based login.

## Features
- ✅ Google OAuth login
- ✅ Email/password registration and login
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ Session management
- ✅ User profile management
- ✅ Responsive UI with loading states
- ✅ Error handling and validation

## Authentication Flow

### Registration
1. User fills registration form with name, email, password, and confirmation
2. Frontend validates password match and strength
3. API hashes password with bcrypt and stores user data
4. Success message shown and user redirected to login

### Login
1. **Google OAuth**: User clicks Google login → redirected to Google → authenticated → redirected back
2. **Credentials**: User enters email/password → API validates → session created → redirected to home

### Protected Routes
- `/addProduct` - Requires authentication
- `/manage-product` - Requires authentication
- Middleware automatically redirects unauthenticated users to login

## File Structure

### API Routes
- `src/app/api/auth/[...nextauth]/route.js` - NextAuth configuration
- `src/app/api/auth/register/route.js` - User registration
- `src/app/api/auth/login/route.js` - Credentials login
- `src/app/api/auth/logout/route.js` - Logout handling
- `src/app/api/user/profile/route.js` - User profile management

### Pages
- `src/app/login/page.jsx` - Login form with Google and credentials options
- `src/app/register/page.jsx` - Registration form with validation

### Components
- `src/component/ProtectedRoute.jsx` - HOC for protecting pages
- `src/component/AuthStatus.jsx` - Shows current auth status
- `src/component/ClientLayout.jsx` - Wraps app with SessionProvider
- `src/component/Navbar.jsx` - Navigation with auth-aware UI

### Configuration
- `middleware.js` - Route protection middleware
- `.env.local` - Environment variables for Google OAuth and NextAuth

## Environment Variables
```
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Usage Examples

### Protecting a Page
```jsx
import ProtectedRoute from '@/component/ProtectedRoute';

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}
```

### Using Session Data
```jsx
import { useSession } from 'next-auth/react';

export default function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <p>Loading...</p>
  if (!session) return <p>Not signed in</p>
  
  return <p>Signed in as {session.user.email}</p>
}
```

### Manual Login/Logout
```jsx
import { signIn, signOut } from 'next-auth/react';

// Login with Google
await signIn('google', { callbackUrl: '/' });

// Login with credentials
await signIn('credentials', { email, password, redirect: false });

// Logout
await signOut({ callbackUrl: '/' });
```

## Security Features
- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for session management
- CSRF protection built into NextAuth
- Secure HTTP-only cookies
- Route-level protection with middleware

## Current Limitations
- User data stored in memory (demo purposes)
- No password reset functionality
- No email verification
- No role-based access control

## Next Steps for Production
1. Replace in-memory storage with database (MongoDB/PostgreSQL)
2. Add email verification
3. Implement password reset
4. Add role-based permissions
5. Add rate limiting
6. Add audit logging