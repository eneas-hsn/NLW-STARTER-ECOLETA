const express=require("express")
const server=express()

//configurar pasta pública
server.use(express.static("public"))

//ligar o servidor
server.listen(3000)

//configurar caminhos na minha aplicação
//página inicial
//req é uma requisição e res é uma resposta
server.get("/",(req,res)=> {
    res.sendFile(__dirname+"/views/index.html")
})
//a barra indica o caminho que o servidor vai seguir
server.get("/create-point",(req,res)=> {
    res.sendFile(__dirname+"/views/create-point.html")
})
server.get("/search-results",(req,res)=> {
    res.sendFile(__dirname+"/views/search-results.html")
})