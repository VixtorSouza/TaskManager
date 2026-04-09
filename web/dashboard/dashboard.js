

async function loadingProjects() {
    try {
        // carregar projetos
        const res = await fetch('http://localhost:3000/projects', { // busca os projetos do usuario logado
            credentials: 'include'
        })
        if (!res.ok) {
            throw new Error('Usuario não autorizado ou falha no servidor')
        }
        const data = await res.json() // transforma a resposta em json

        const meuQuadroNoHTML = document.getElementById('meuQuadroNoHTML') // pega o quadro no html
        meuQuadroNoHTML.innerHTML = ""
        data.forEach((projeto) => { // para cada projeto
            meuQuadroNoHTML.innerHTML += `
        <div>
            <h2>${projeto.name}</h2>
            <p>${projeto.description}</p>
            <!-- O segredo está aqui: passamos o id na URL -->
            <a href="/tasks/projects.html?id=${projeto.id}">
                <button>Abrir Projeto</button>
            </a>
        </div>
    `
        });

    }
    catch (error) {
        console.log(error)
        window.location.href = '/login'

    }
}
function createProject() {
    const criarProjetoBtn = document.getElementById('criarProjetoBtn')
    const nomeProjeto = document.getElementById('nomeProjeto')
    const descricaoProjeto = document.getElementById('descricaoProjeto')
    criarProjetoBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('http://localhost:3000/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nomeProjeto.value,
                    description: descricaoProjeto.value
                }),
                credentials: 'include'
            })
            if (!res.ok) {
                throw new Error('Erro ao criar projeto')
            }
            const data = await res.json()
            console.log(data)
            loadingProjects()
            nomeProjeto.value = ''
            descricaoProjeto.value = ''
        }
        catch (error) {
            console.log(error)
        }
    })
}

function configLogoutBtn() {
    // logout 
    const logoutBtn = document.getElementById('logoutBtn')

    logoutBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/'
                } else {
                    throw new Error('Erro ao fazer logout')
                }
            })
            .catch(error => {
                console.log(error)
            })
    })
}

loadingProjects()
createProject()
configLogoutBtn()
