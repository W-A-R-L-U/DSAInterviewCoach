import { connect } from '@/db/db'
import User from '@/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDataFromToken } from '@/helpers/helperFunctions'

connect()

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json()
        const { currentPassword, newPassword } = reqBody

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ message: 'Current password and new password are required', success : false }, { status: 200 })
        }

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({ message: 'User does not exist', success : false}, { status: 200 })
        }

        const validPassword = await bcrypt.compare(currentPassword, user.password)
        if (!validPassword) {
            return NextResponse.json({ message: 'Current password is incorrect', success : false }, { status: 200 })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()

        return NextResponse.json({ message: 'Password changed successfully', success: true }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}