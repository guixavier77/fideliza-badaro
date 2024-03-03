import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/database/firebase/config";

const { admin } = require('../../../services/firebase/firebaseAdmin');
const authAdmin = admin.auth();

interface Credentials {
  email: string;
  password: string;
}

interface FirebaseUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

function convertFirebaseUserToNextAuthUser(firebaseUser: FirebaseUser) {
  const nextAuthUser = {
    id: firebaseUser.uid,
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    photoURL: firebaseUser.photoURL
  };
  return nextAuthUser;
}


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as Credentials
        try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          if (!user) return null;
          const nextAuthUser = convertFirebaseUserToNextAuthUser(user);
          return nextAuthUser;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
  session: {
    secret: process.env.NEXTAUTH_SECRET,
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account, profile }: any) {
      try {
        // Verificar se o usuário já existe no Firebase Authentication
        const userRecord = await authAdmin.getUserByEmail(user.email);
        if (userRecord) {
          // console.log('Usuário já existe no Firebase Authentication');
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Ocorreu um erro ao verificar ou criar a conta:', error);
        return false;
      }
    },
    async session({ session, token, user }: any) {
      session.token = token;

      return session
    },
    async jwt({ token, user, profile, account }: any) {
      if (user) {
        try {
          const userDoc = await new UserDB().getByEmail(user.email);

          if (userDoc) {
            token.user = userDoc;
            user = userDoc;
          }
        } catch (error) {
          console.error('Erro ao obter os dados do usuário do Firestore:', error);
        }
        token = { ...token, ...user }
      }
      return token
    },

  },
  pages: {
    signIn: "/auth-pages/login",
    error: "/404",
    // error: "/auth-pages/sign-up",
  },
}


export default NextAuth(authOptions)
