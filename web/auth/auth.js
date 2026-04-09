// register form

const register = document.querySelector("#registerForm")
const login = document.querySelector("#loginForm")
const logout = document.querySelector("#logoutBtn")
const registerBtn = document.querySelector("#registerBtn")
const backBtn = document.querySelector("#backBtn")
if (register) {
    register.addEventListener("submit", async (e) => {
        e.preventDefault() // impedir de carregar a pagina

        const name = document.querySelector("#name").value
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        console.log(name, email, password)

        try {
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
            if (response.ok) {
                alert("Usuario cadastrado com sucesso")
                window.location.href = "/auth/authLogin.html"
            } else {
                alert("Erro ao cadastrar usuario:" + data.message)
            }

        } catch (error) {
            console.log(error)
        }
    })
}

if (login) {
    login.addEventListener("submit", async (e) => {
        e.preventDefault()

        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        try {
            console.log("Enviando:", { email, password })
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
            if (response.ok && data.token) {
                alert("Usuario logado com sucesso")
                window.location.href = "/dashboard/dashboard.html"
                localStorage.setItem("token", data.token)
            } else {
                alert("Erro no login: " + data.message)
            }
        } catch (error) {
            console.log("erro de conexão", error)
        }
    })
}


if (registerBtn) {
    registerBtn.addEventListener("click", () => {
        window.location.href = "/auth/authRegister.html"
    })
}
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "/index.html"
    })
}