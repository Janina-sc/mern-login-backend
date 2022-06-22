const Usuario= require('../model/usuario');


const getUserById= async(req, res)=>{
    const { userId } = req.params;

    if(userId.length === 24){  //los ids creados por Mongodb tienen 24 chars
        Usuario.findById(userId)
        .then((usuario)=>{
            if(!usuario){
                return res.json({message: "No se encontró usuario con esa ID"})
            } else {
                const {_id, contraseña, __v, ...resto} = usuario._doc//_v: version
                res.json(resto);
            }
        });
    } else{ //if id !== 24 chars
        res.json({message: "Contraseña incorrecta"});
    }


};
module.exports=getUserById;