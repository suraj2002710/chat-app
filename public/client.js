const socket = io()
do {
     nam = prompt("Enter Your Name For Login")
} while (!nam);
// userjoin(nam,'join')

     socket.emit("newuserjoin",nam)
     socket.on("newuserconnect",(socketuser)=>{
     // console.log(socketuser,"joined")
     // userjoin(socketuser,'joined')
})

var chatbox=document.querySelector('.chatbox')

// function userjoin(name,status){
//      let div=document.createElement('div')
//      div.classList.add('userjoin')
//      content=`<h4><b>${name}</b> ${status}</h4>`
//      div.innerHTML=content
//      chatbox.appendChild(div)
//      // let userjoin =document.getElementById('userjoin')
//      // userjoin.innerHTML=`<h4>${name},${status}</h4>`
//      }


     socket.on("userdisconnected",(snam)=>{
          // console.log(snam,"left")
          // userjoin(snam,'left')
     })
     // sendmessage 
     let send=document.getElementById('send')
     let textarea=document.getElementById('messageinp')
     send.addEventListener('click',()=>{
          sendmessage(textarea.value)
          textarea.value=""
     })
     textarea.addEventListener('keyup',(e)=>{
          if(e.key=='Enter'){
               sendmessage(e.target.value)
               console.log(textarea.value)
               textarea.value=""
          }
     })
     function sendmessage(mesg){
          let msg={
               user:nam,
               mes:mesg
          }
          appendmessage(msg,'outgoing')

          // send to server
          socket.emit("message",msg)
     }
     function appendmessage(msg,type){
          let maindiv=document.createElement('div')
          let classname=type
          maindiv.classList.add(classname)

          let markup=`
          <h4>${msg.user}</h4>
          <p>${msg.mes}</p>`

          maindiv.innerHTML=markup
          chatbox.appendChild(maindiv)
     }


     socket.on("message",(msg)=>{
          tp.innerHTML=""
          appendmessage(msg,'incoming')
          console.log(msg)
     })

     // user typing
     textarea.addEventListener('keypress',(e)=>{
          socket.emit("typing",nam)
     })
     let tp=document.getElementById('typing')
     socket.on("typing",(nam)=>{
          tp.innerHTML=`<h3>${nam} is typing......</h3>`
     })

     //user counting
     let userlist=document.getElementById('userlist')
     socket.on("userlist",(user)=>{
          userlist.innerHTML=""
          arr=Object.values(user)
          for(i=0;i<arr.length;i++)
          {
               let p=document.createElement('p')
               p.innerText=arr[i]
               userlist.appendChild(p)
          }
          
     })

     // click on the three line to display userbox
     var userbox=document.getElementById('ubox')
     var threebar=document.getElementById("threebar")
     threebar.addEventListener('click',(e)=>{
          if(userbox.style.display != 'none'){
               userbox.style.display='none'
          }
          else{
               userbox.style.display='block'
          }
     })
     // threebar.addEventListener('click',()=>{
     //      if(userbox.style.display != 'none'){
     //           userbox.style.display='none'
     //      }
     //      else{
     //           userbox.style.display='block'
     //      }
     // })