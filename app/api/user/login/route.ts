import {connect} from '@/db/db'
import User  from '@/models/UserModel'
import {NextRequest, NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {email, password} = reqBody;

        const user = await User.findOne({email});
         if(!user){
            return NextResponse.json({error:'Username or password is wrong'},{status:500})
        }
        
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:'Username or password is wrong'},{status:500})
        }

        const tokenData = {
            id: user._id,
            username : user.username,
            email : user.email,
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SEC!,{expiresIn : '1d'})

        const response = NextResponse.json({message : 'Logged in succssfully',success : true},{status:200})

        response.cookies.set("token",token,{httpOnly : true})

        return response
    }catch(error : any){
        return NextResponse.json({error: error.message},{status:500})
    }
}