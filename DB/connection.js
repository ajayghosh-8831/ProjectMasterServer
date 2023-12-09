const mongoose=require('mongoose')
const connectionString=process.env.DATABASE
mongoose.connect(connectionString).then( ()=>{
    console.log("---- MongoDB  Connected");
}

).catch((error)=>{
console.log(`Mongo Db Connection Failed !! ${error}`);
})