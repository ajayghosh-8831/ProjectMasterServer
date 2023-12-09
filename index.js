//load env file 
require('dotenv').config()

const express= require('express')
const cors=require('cors')

const route=require('./Routes/routes')
require('./DB/connection')
const projectServer=express()
projectServer.use(cors())
projectServer.use(express.json())

//export upload folder to client 
projectServer.use('/uploads',express.static('./uploads'))

projectServer.use(route)
const PORT=4000 || process.env.PORT

projectServer.listen(PORT,()=>{
    console.log(`__________ Project server running at Port Number : ${PORT} `);
})
projectServer.get('/',(req,res)=>{
    res.send('<h1> Project Server started... </h1>')
})

// projectServer.post('/',(req,res)=>{
//     res.send('POST METHOD ...')
// })
// projectServer.put('/',(req,res)=>{
//     res.send('PUT METHOD....')
// })