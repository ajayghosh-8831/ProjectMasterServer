const mongoose=require('mongoose')

const userSchema=new mongoose.Schema(
    {
      userName:{
        type:String,
        required:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      gitHub:{
        type:String
      },
      linkedin:{
        type:String
      },
      profile:{
        type:String
      }
    }
)

const users=mongoose.model("users",userSchema)
module.exports=users