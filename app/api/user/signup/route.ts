import {connect} from '@/db/db'
import User  from '@/models/UserModel'
import {NextRequest, NextResponse} from 'next/server'
import bcrypt from 'bcryptjs'
import {emailSender} from '@/helpers/mailer'

connect()

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json()
        const {username, email, password} = reqBody;

        console.log(reqBody);
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: 'User already exists'},{status:400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        await emailSender({email,emailType : 'VERIFY', userId : savedUser._id})

        return NextResponse.json({message : 'Uset registered successfully',sucess: true, savedUser}, {status : 200})
    }catch(error : any){
        return NextResponse.json({error: error.message},{status: 500})
    }
}