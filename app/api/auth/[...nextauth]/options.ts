import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import  UserModel  from "@/models/User";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" ,placeholder: "Enter your email"},
                password: { label: "Password", type: "password" ,placeholder: "Enter your password"}
            },
            async authorize(credentials:any):Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({ $or:[
                        {email: credentials.identifier},
                        {username: credentials.identifier}
                    ]});
                    if(!user) throw new Error("User not found");
                    if(!user.isVerified) throw new Error("Please verify your email to login");
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if(!isPasswordValid) throw new Error("Invalid password");
                    return user;
                } catch (error:any) {
                    throw new Error("Invalid credentials" , error);
                }
                
            }

        })
    ],
    callbacks:{
        async session({session,token}){
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session;
        },
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        }
    },
    pages:{
        signIn:'/signin',
    },
    session:{
        strategy:'jwt',
        maxAge: 30 * 24 * 60 * 60,//30 days
        updateAge: 24 * 60 * 60,//24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
}