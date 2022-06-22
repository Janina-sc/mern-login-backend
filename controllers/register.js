const bcrypt= require('bcrypt'); //to encrypt the password
const  Usuario =require('../model/usuario');

const register= async( req, res)=>{
    const {nombre, correo, contraseña}=req.body;
    
    Usuario.findOne({correo})//check if there's a user with that email
    .then((usuario)=>{
        if(usuario){
            return res.json({message: "Ya existe un usuario con este correo"})
        } else if(!nombre || !correo || !contraseña){
            return res.json({message: "Falta el nombre/correo/contraseña"})
        } else{
            bcrypt.hash(contraseña,10, (error, contraseñaHaseada) =>{//si tiene eso, hashea la contraseña, el 2° parám. es cuántas veces lo hashea
                if(error) res.json({error})
                else{
                    const nuevoUsuario= new Usuario({
                        nombre,
                        correo, 
                        contraseña: contraseñaHaseada
                    });
                    nuevoUsuario.save()
                    .then((usuario)=>{
                        res.json({message: "Usuario creado correctamente", usuario})
                    })
                    .catch(error=>console.error(error))
                }
            }) 
        }
    })

}

module.exports=register;