import mongoose, { Model } from 'mongoose'

export interface IUser {
    username: string
    email: string
    password: string
    isVerified: boolean
    isAdmin: boolean
    forgotPasswordToken?: string
    forgotPasswordExpiry?: Date
    verifyToken?: string
    verifyTokenExpiry?: Date
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Pleae provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Pleae provide a email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Pleae provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = (mongoose.models.users as Model<IUser>) || mongoose.model<IUser>('users', userSchema)

export default User