import jwt from 'jsonwebtoken';
import config from "../config.js";

const SECRET_WORD = config.SECRET_WORD;

const verifyToken = async(req,res,next)=>{
    const token = req.headers["token"];

     if(token){
         jwt.verify(token,SECRET_WORD,(error,data)=>{
             if(error) return res.status(400).json({ mensaje:"Token invalido"});
             else{
                 req.user = data;
                 next();
             }
         });
     }else{
         res.status(400).json({ mensaje: "Debes enviar un token"});
     }
};

export default verifyToken;