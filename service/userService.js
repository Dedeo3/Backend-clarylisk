import { validate } from "../validation/validation.js";
import { regisValidation } from "../validation/userValidation.js";
import { loginValidation } from "../validation/userValidation.js";
import { PrismaClient } from "@prisma/client";
import responseError from "../error/responseError.js";
import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient()

export const register = async (req) => {
    const user = validate(regisValidation, req)

    const countUser = await prisma.user.count({
        where: {
            username: user.username
        }
    });

    if (countUser === 1) {
        throw new responseError(400, "username already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    const insertUser = await prisma.user.create({
        data: {
            username: user.username,
            password: user.password,
            description: user.description,
            role: user.role
        }
    })

    await prisma.photo.create({
        data: {
            image: user.image,
            idUser: insertUser.idUser
        }
    })

    await prisma.wallet.create({
        data: {
            idUser: insertUser.idUser,
            walletAdress: user.walletAddress
        }
    })

    await prisma.mediaSocial.create({
        data: {
            idUser: insertUser.idUser,
            facebook: user?.facebook,
            twitter: user?.twitter,
            instagram: user?.instagram,
            youtube: user?.youtube
        }
    })

    const walletData = await prisma.wallet.findUnique({
        where: {
            idUser: insertUser.idUser
        },
        select: {
            walletAdress: true
        }
    });


    const response = walletData?.walletAdress || null;
    return response
}


const generateToken =(username) => {
    return jwt.sign({username}, process.env.TOKEN_SECRET, {
        expiresIn: '3600s'  //1 hour
    })
}
export const login = async (req) => {
    console.log("req body login:", req)
    const user = validate(loginValidation, req)

    const response = await prisma.user.findFirst({
        where: {
            wallet: { some: { walletAdress: user.walletAddress } }
        },
        select: {
            idUser: true,
            username: true,
            password: true
        }
    });

    if (response && await bcrypt.compare(user.password, response.password)) {
        const token = generateToken(response.username)
        return {
            token: token
        }
    } else {
        throw new responseError(400, "login failed")
    }
}

export const tesMiddleware= async(req)=>{
    if(req!= null){
        return {
            message:"success"
        }
    }else{
        return{
            message:"null auth"
        }
    }
}
