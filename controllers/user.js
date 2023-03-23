import User from "../schemas/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

 export const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({}).populate('orders');
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}
export const getUser = async(req,res)=>{

    try {
        const user = await User.find({ _id: req.params.id }).populate('orders',{
            _id: 1,
            name_user: 1,
            price: 1,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

 export const createUser = async(req,res)=>{
    const {name, email, password} = req.body;

    User.findOne({email}).then((user)=>{
        if(user){
            return res.json({mensaje:"Ya existe un usuario con este correo electronico"});
        }else if(!name ||!email||!password){
            return res.json({ mensaje:"Falta un campo por completar"});
        }else{
            bcrypt.hash(password,10,(error, passwordHased)=>{
                if(error) res.json({error});
                else{
                    const newUser = new User({
                        name,
                        email,
                        password:passwordHased,
                    });

                    newUser.save().then((user)=>{
                        res.json({ mensaje:"Usuario creado correctamente", user});
                    })
                    .catch((error)=> console.error(error));
                }
            });
        }
    });
};

export const login = async(req,res)=>{
    const {email,password} = req.body;

    User.findOne({email}).then((user)=>{
        if(!user){
            return res.json({ mensaje: "El usuario no existe."});
        }

        bcrypt.compare(password, user.password).then((esCorrecta)=>{
            if(esCorrecta){
                const {id , name } = user;

                const data = {
                    id,
                    name
                };

                const token = jwt.sign(data, "secreto",{ expiresIn:864000,});

                res.json({
                    mensaje:"Sesion iniciada exitosamente",
                    user:{
                        id,
                        name,
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
 export const updateUser = async(req,res)=>{
    try {
        const user = await User.findOneAndUpdate({ _id:req.params.id }, req.body,{})
        res.status(200).json({mensaje:"Usuario editado correctamente",user});
    } catch (error) {
        res.status(500).json(error);
    }
}
 export const deleteUser = async(req,res)=>{
    try {
        const user = await User.findOneAndDelete({ _id:req.params.id })
        res.status(200).json({mensaje:"Usuario eliminado correctamente",user});
    } catch (error) {
        res.status(500).json(error);
    }
}