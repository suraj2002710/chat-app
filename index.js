const express=require('express')
const app=express()
const http = require('http')
const { SourceMap } = require('module')
const port=process.env.PORT || 300
const server= http.createServer(app)

app.use(express.static(__dirname + '/public'))
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

server.listen(port, ()=>{
    console.log("connected",port);
})

//scoket 
const io=require('socket.io')(server)
let user={}

io.on("connection",(socket)=>{
    socket.on("newuserjoin",(nam)=>{
        user[socket.id]=nam
        socket.broadcast.emit("newuserconnect",nam)
        io.emit("userlist",user)
        console.log(nam)
    })
    // socket.on("disconnected",function(){
        //     console.log("disconnect")
        // })
        // socket.on("connect", () => {
            //     console.log("connect"); // true
            //   });
            
            socket.on("disconnect", () => {
                socket.broadcast.emit("userdisconnected",usr=user[socket.id])
                    delete user[socket.id]
                    io.emit("userlist",user)
        console.log("disconnected"); // false
      });
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })
    socket.on("typing",(nam)=>{
        socket.broadcast.emit("typing",nam)
    })
})