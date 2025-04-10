import { connect } from "http2";
import connectMongoDB from "@/config/mongodb";
import User from "../../models/authSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found'}, {status:401});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return NextResponse.json({message: 'invalid credentials'}, { status:401});
        }
        return NextResponse.json({ message: 'Login success', userId: user._id}, {status: 200})
    } catch (err) {
        console.error('Login error: ', err);
        return NextResponse.json({ message: 'Internal server error'}, {status:500});
    }
}