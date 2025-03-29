import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";



export async function POST(request: NextRequest) {
    await dbConnect();
    const { username, email, password } = await request.json();

    try {
        const existingUser = await UserModel.findOne({ username , isVerified:true });
        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "Username already exists"
            }, { status: 400 });
        }
        const existingEmail = await UserModel.findOne({ email});
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (existingEmail) {
            if(existingEmail.isVerified){
                return NextResponse.json({
                    success: false,
                    message: "User already exists with this email"
                }, { status: 400 });
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingEmail.password = hashedPassword;
                existingEmail.verifyCode = verifyCode;
                existingEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingEmail.save();
                const emailResponse = await sendVerificationEmail(email,username,verifyCode);
                if(emailResponse.success){
                    return NextResponse.json({
                        success: true,
                        message: "User Registered successfully, please verify your email"
                    }, { status: 201 });
                }
                else{
                    return NextResponse.json({
                        success: false,
                        message: emailResponse.message
                    }, { status: 500 });
                }
            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour
            const newUser = await UserModel.create({
                username,
                email,
                password: hashedPassword,
                isVerified: false,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessages: true,
                messages: []
            });
            await newUser.save();
        }
        //send verification email
        const emailResponse = await sendVerificationEmail(email,username,verifyCode);
        if(emailResponse.success){
            return NextResponse.json({
                success: true,
                message: "User Registered successfully, please verify your email"
            }, { status: 201 });
        }
        else{
            return NextResponse.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        }
       
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to signup",
            error: error
        }, { status: 500 });
    }
}