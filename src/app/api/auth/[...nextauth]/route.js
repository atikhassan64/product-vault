// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     // GOOGLE LOGIN
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),

//     // CREDENTIALS LOGIN
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         // Demo User (Later you can use your database)
//         const demoUser = {
//           id: "1",
//           name: "Atik Hassan",
//           email: "atik@gmail.com",
//           password: "$2b$10$WjycIKQZqlwgeTt/KvGRGei/3eqe4Pf55TiuGQ2HntnexIQYwzWQW", // hashed: 123456
//         };

//         if (credentials.email !== demoUser.email) {
//           throw new Error("User not found");
//         }

//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           demoUser.password
//         );

//         if (!isMatch) throw new Error("Incorrect password");

//         return demoUser;
//       },
//     }),
//   ],

//   callbacks: {
//     async redirect() {
//       return "/";
//     },
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("productVault");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
