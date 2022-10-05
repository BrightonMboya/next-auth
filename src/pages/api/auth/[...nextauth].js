import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      // if you want next-auth to generate a form for you, go ahead and add the credentials; but we have it already
      async authorize(credentials) {
        const client = await connectToDatabase(); //connect to the mongodb
        const userCollection = client.db().collection("users");

        //look for that user
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("No user Found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
});
