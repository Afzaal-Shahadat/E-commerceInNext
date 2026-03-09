// // lib/auth.js
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// import { connectDB } from "@/lib/db";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });
//         if (!user) return null;

//         const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
//         if (!passwordsMatch) return null;

//         return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: ({ token, user }) => {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     session: ({ session, token }) => {
//       if (token?.id) session.user.id = token.id;
//       if (token?.role) session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
//   secret: process.env.NEXTAUTH_SECRET,
// });



import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const match = await bcrypt.compare(credentials.password, user.password);

        if (!match) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    session({ session, token }) {
      if (token?.role) session.user.role = token.role;
      return session;
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
});