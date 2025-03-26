import { validate } from "../validation/validation.js";
import { regisValidation } from "../validation/userValidation.js";
import { PrismaClient } from "@prisma/client";
import  responseError  from "../error/responseError.js";
import bcrypt from'bcrypt';

const prisma= new PrismaClient()

export const register= async(req)=>{
    const user = validate(regisValidation,req)

    const countUser= await prisma.user.count({
        where:{
            username:user.username
        }
    });

    if(countUser === 1){
        throw new responseError(400, "username already exist")
    }

    user.password=await bcrypt.hash(user.password,10)

    const insertUser= await prisma.user.create({
        data:{
            username:user.username,
            password:user.password,
            description:user.description,
            role:user.role
        }
    })

    await prisma.photo.create({
        data:{
            image:user.image,
            idUser:insertUser.idUser
        }
    })

     await prisma.wallet.create({
        data:{
            idUser:insertUser.idUser,
            walletAdress:user.walletAddress
        }
    })

    await prisma.mediaSocial.create({
        data:{
            idUser:insertUser.idUser,
            facebook:user?.facebook,
            twitter:user?.twitter,
            instagram:user?.instagram,
            youtube:user?.youtube
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

