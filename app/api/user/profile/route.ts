import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/helperFunctions'

connect()

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({ _id: userId }).select('-password')
        if(!user){
            return NextResponse.json({error:'User does not exist'},{status:404})
        }
        return NextResponse.json({ message: 'User found', data: user })
    } catch (error: any) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
}