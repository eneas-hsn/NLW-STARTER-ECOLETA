const express=require("express")
const server=express()

//pegar o banco de dados
const db=require("./database/db")

//configurar pasta pública
server.use(express.static("public"))

//ligar o servidor
server.listen(3000)

//utilizando template engine
const nunjucks=require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache:true
}) 

//
//configurar caminhos na minha aplicação
//página inicial
//req é uma requisição e res é uma resposta
server.get("/",(req,res)=> {
    return res.render("index.html")
})
//a barra indica o caminho que o servidor vai seguir
server.get("/create-point",(req,res)=> {
     return res.render("create-point.html")
})
server.get("/search-results",(req,res)=> {
   
    db.all(`SELECT * FROM places`, function(err,rows) {
        if (err) {
            return console.log(err)
        }
        const total= rows.length
        console.log("Aqui estão seus registros")
        console.log(rows)
        return res.render("search-results.html", {places:rows, total:total})
    })
    
})