
const params = new URLSearchParams(window.location.search);
console.log(params.get('id'));
const id = params.get('id');
const div = document.getElementById('tarefasDoProjeto');

function deleteTask() {

}

async function getTask() {
    const response = await fetch(`http://localhost:3000/task/project/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    div.innerHTML = ""
    data.forEach(task => {
        div.innerHTML += `
        <p>${task.title}</p>
        <p>${task.description}</p>
        <p>${task.status}</p>
        <p>${task.priority}</p>
        <button onclick="editTask(${task.id})">Editar</button>
        <button onclick="deleteTask(${task.id})">Deletar</button>
        `;

    });
}

async function createdTask() {
    const title = document.querySelector('#nomeTarefa')
    const description = document.querySelector('#descricaoTarefa')
    const prioridade = document.querySelector("#prioridadeTarefa")
    const status = document.querySelector("#statusTarefa")
    const btnCreated = document.querySelector("#criarTarefaBtn")

    btnCreated.addEventListener("click", async () => {
        const response = await fetch("http://localhost:3000/task/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                priority: prioridade.value,
                status: status.value,
                project_id: id
            })
        })
        const data = await response.json();
        console.log(data);
        getTask();
        title.value = ""
        description.value = ""
        prioridade.value = ""
        status.value = ""
    })

}
async function editTask() {

}


createdTask()
getTask();