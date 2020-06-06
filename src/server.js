const express=require("express")
const server=express()

//ligar o servidor
server.listen(3000)

//configurar caminhos na minha aplicação
//página inicial
//req é uma requisição e res é uma resposta
server.get("/",(req,res)=> {
    res.sendFile(__dirname+"/views/index.html")
})