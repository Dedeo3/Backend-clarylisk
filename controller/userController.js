import { register } from "../service/userService.js";
export const registerUser= async(req, res, next)=>{
    try{
        const result= await register(req.body)
        res.status(200).json({
            message: "success registered",
            walletAdress:result
        })
    }catch(err){
        console.error("Error register:", err);
        next(err)
    }
}
