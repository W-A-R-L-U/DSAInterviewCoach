import {connect} from '@/db/db';
import User  from '@/models/UserModel';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateLogin } from '@/helpers/helperFunctions';

connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;
        const validation = validateLogin(email, password);
        if(validation?.message){
            return NextResponse.json({message : validation?.message, success : false}, {status : 200});
        }
        const user = await User.findOne({email});
         if(!user){
            return NextResponse.json({message:'Email or password is wrong', success : false},{status:200})
        }
        
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({message:'Email or password is wrong', success : false},{status:200})
        }
        if(!user?.isVerified){
            return NextResponse.json({message : "Please verify your email before logging in.", success : false}, {status : 200})
        }

        const tokenData = {
            id: user._id,
            username : user.username,
            email : user.email,
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SEC!,{expiresIn : '1d'})

        const response = NextResponse.json({message : 'Logged in successfully',success : true},{status:200})

        response.cookies.set("token",token,{httpOnly : true})

        return response
    }catch(error : any){
        return NextResponse.json({error: error.message},{status:500})
    }
}