const bcrypt= require('bcrypt');
const Usuario=require('../model/usuario')

const login= async( req, res)=>{
    const {correo, contraseña}=req.body;  
     Usuario.findOne({correo})
     .then((usuario)=>{
        if(!usuario){
            return res.json({message:"Usuario no encontrado"});
        }
        bcrypt.compare(contraseña, usuario.contraseña)//compara la contraseña enviada con la contraseña guardada en la base de datos
        .then((esCorrecta)=>{
            if(esCorrecta){
                const {id, nombre}=usuario
                return res.json({message: "Usuario logueado correctamente",
            usuario:{
                id, 
                nombre
            }})
            }
            else{
                return res.json({message: "Contraseña incorrecta"})
            }

        })
    })
}

module.exports=login;