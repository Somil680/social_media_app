import NextAuth, { SessionStrategy } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { API_BASE_URL } from '@/services/constant'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

        async authorize(credentials, req) {
          
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
            }),
        })
        let {user} = await res.json()
        console.log("🚀 ~ file: route.ts:30 ~ authorize ~ user:", user)
        if (user) {
          console.log('hello')
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    ],
      debug: true,
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 5 * 60 * 60,
  },
  jwt: {
    maxAge: 5 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },

    async session({ session, token }: any) {
      session.user = token
      console.log("🚀 ~ file: route.ts:56 ~ session ~ session.user = token:", session.user )
      session.accessToken = token.token.accessToken as any
      console.log("🚀 ~ file: route.ts:58 ~ session ~  session.accessToken:",  session.accessToken)
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
