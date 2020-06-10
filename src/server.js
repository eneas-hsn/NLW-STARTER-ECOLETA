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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
            return console.log("Erro no cadastro")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
    db.run(query, values,afterInsertData)
    return res.render("create-point.html", {saved:true})
})

server.get("/search",(req,res)=> {
    //caso pesquisa vazia
    const search=req.query.search
    if (search=='') {
        return res.render("search-results.html", {total:0})
    }
    
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err,rows) {
        if (err) {
            return console.log(err)
        }
        const total= rows.length
        console.log("Aqui estão seus registros")
        console.log(rows)
        return res.render("search-results.html", {places:rows, total:total})
    })
    
})