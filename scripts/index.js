const buttonSearch=document.querySelector('#page-home main a')
const modal=document.querySelector("#modal")
const clouse=document.querySelector("#modal .header a")

buttonSearch.addEventListener("click",()=>{
    modal.classList.remove("hide")
})
clouse.addEventListener("click",()=>{
    modal.classList.add("hide")
})

