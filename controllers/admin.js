import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../schemas/admins.js';

 export const getAllAdmins = async(req,res)=>{
    try {
        const admins = await Admin.find({});
        res.json(admins);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const getAdmin = async(req,res)=>{
    const {id} = req.user;
    
    Admin.findById(id).then((user)=>{
        if(!user){
            return res.json({
                mensaje:"No se encontro ningun usuario"
            });
        }else {
            const {_id, password, __v, ...resto } = user._doc;
            res.json(resto);
        }
    });
}

 export const createAdmin = async(req,res)=>{
    const { email, password} = req.body;

    Admin.findOne({email}).then((admin)=>{
        if(admin){
            return res.json({mensaje:"Ya existe un usuario con este correo electronico"});
        }else if(!email||!password){
            return res.json({ mensaje:"Falta un campo por completar"});
        }else{
            bcrypt.hash(password,10,(error, passwordHased)=>{
                if(error) res.json({error});
                else{
                    const newAdmin = new Admin({
                        email,
                        password:passwordHased,
                    });

                    newAdmin.save().then((admin)=>{
                        res.json({ mensaje:"Usuario creado correctamente", admin});
                    })
                    .catch((error)=> console.error(error));
                }
            });
        }
    });
};

export const loginAdmin = async(req,res)=>{
    const {email,password} = req.body;

    Admin.findOne({email}).then((admin)=>{
        if(!admin){
            return res.json({ mensaje: "El usuario no existe."});
        }

        bcrypt.compare(password, admin.password).then((esCorrecta)=>{
            if(esCorrecta){
                const {id ,email } = admin;

                const data = {
                    id,
                    email
                };

                const token = jwt.sign(data, "secreto",{ expiresIn:864000,});

                res.json({
                    mensaje:"Sesion iniciada exitosamente",
                    admin:{
                        id,
                        email,
                        token,
                    },
                });
            }else{
                return res.json({
                    mensaje:"Contraseña incorrecta"
                });
            }
        });
    });
};
export const updateAdmin = async(req,res)=>{
    try {
        const admin = await Admin.findOneAndUpdate({ _id:req.params.id }, req.body,{})
        res.status(200).json({mensaje:"Usuario editado correctamente",admin});
    } catch (error) {
        res.status(500).json(error);
    }
}
 export const deleteAdmin = async(req,res)=>{
    try {
        const admin = await Admin.findOneAndDelete({ _id:req.params.id })
        res.status(200).json({mensaje:"Usuario eliminado correctamente",admin});
    } catch (error) {
        res.status(500).json(error);
    }
}