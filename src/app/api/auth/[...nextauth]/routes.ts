import NextAuth from 'next-auth'
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
        const res = await fetch(`${API_BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.email,
            password: credentials?.password,
          }),
        })
        let user = await res.json()
        user = user?.data
        console.log(user)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
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
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return { ...token, ...user }
    },

    async session({ session, token }: any) {
      session.user = token
      session.accessToken = token.token.accessToken as any
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
