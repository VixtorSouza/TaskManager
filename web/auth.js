// register form

const register = document.querySelector("#registerForm")
const login = document.querySelector("#loginForm")



register.addEventListener("submit", async (e) => {
    e.preventDefault() // impedir de carregar a pagina

    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    console.log(name, email, password)

    try{
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ // transforma em json
                name,
                email,
                password
            })
        })
        // saber se foi mesmo
        const data = await response.json()
        console.log(data)
        if(response.ok){
            alert("Usuario cadastrado com sucesso")
            window.location.href = "/"
        }else{
            alert("Erro ao cadastrar usuario:" + data.message)
        }
        
    }catch(error){
        console.log(error)
    }
}) 

login.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.querySelector("#email").value
    const password = document.querySelector("#password")

    try{
        //conectando com a api com metodo post
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()
        console.log(data)
        if(response.ok){
            alert("Usuario logado com sucesso")
            window.location.href = "/"
            if(data.token){
                localStorage.setItem("token", data.token)
            }
        }else{
            console.log("erro no login")
        }
    }catch( error){
        console.log("erro de conexão")
    }
    })