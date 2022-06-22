const mongoose= require('mongoose')

const MONGO_URL='mongodb://localhost/autenticacionLocal'//lo pegamos en mongoCompass, click en connect y vamos al modelo usuarios

const db= async()=>{
    await mongoose.connect(MONGO_URL)
    .then(()=>console.log('DB on'))//if it's connected to db console log
    .catch((error)=>console.error(error))//if not connected console log error
}

module.exports=db