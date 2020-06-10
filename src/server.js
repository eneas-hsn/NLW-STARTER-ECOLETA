const express=require("express")
const server=express()

//pegar o banco de dados
const db=require("./database/db")

//configurar pasta pública
server.use(express.static("public"))

//habilitar o server body
server.use(express.urlencoded({extended:true}))
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
    //req.query= query strings na url
    //console.log(req.query)

     return res.render("create-point.html")
})

server.post("/savepoint", (req,res)=>{
    // console.log(req.body)
    // return res.send("ok")
    //inserir dados na tabela
    const query = `INSERT INTO places(
    image,
    name, 
    address,
    address2,
    state,
    city,
    items
)VALUES(?,?,?,?,?,?,?)`

    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    db.run(query, values,afterInsertData)
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