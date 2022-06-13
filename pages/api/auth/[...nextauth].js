import NextAuth from "next-auth";

// Provider
import CredentialsProvider from "next-auth/providers/credentials";

// Query
import { CREATE_USER, GET_USER_BY_NAME } from "database/queries/user";

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const userCredentials = {
          name: credentials.name,
        };

        //? Check email or username
        const userFound = await GET_USER_BY_NAME({
          name: userCredentials?.name,
        });

        //? Condition where user not found
        if (!userFound) {
          const newUser = await CREATE_USER({ name: userCredentials?.name });
          return { message: "Successfully create new user", user: newUser };
        }

        return { message: "Successfully Login", success: true };
      },
    }),
  ],
  callbacks: {
    //* Setting for SignIn Fucntion
    async signIn({ user, account, profile, email, credentials }) {
      //? ============== Handle Credentials Login ============= ?//
      if (account.provider == "credentials") {
        return true;
      }
      // * ====================================== * //
    },
    //* Setting JWT Token
    async jwt({ token, user, account, profile, isNewUser }) {
      //? ============== Handle Token Credentials Login ============= ?//
      if (account?.provider === "credentials") {
        token.user = user;
      }
      // * ====================================== * //
      return token;
    },
    //* Setting Session
    async session({ session, user, token }) {
      // Setup Session with data from token
      session.user.id = token.user.user.id;
      return session;
    },
  },
});
