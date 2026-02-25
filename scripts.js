// Seleciona a nossa ul com a lista de clientes no HTML
const apiBase = "https://crudcrud.com/api/5b1dea69f8784bc9b8b7e07c26b66660/clientes";
const listaClientes = document.getElementById("listaClientes");

// carregar e renderizar todos os clientes (GET)
fetch(apiBase)
    .then(resposta => resposta.json())
    .then(lista => {
        lista.forEach(cliente => {
            const item = document.createElement("li");
            item.innerHTML = `${cliente.nome} - ${cliente.email} <button>Excluir</button>`;
            // associar botão de exclusão
            item.querySelector("button").addEventListener("click", () => {
                fetch(`${apiBase}/${cliente._id}`, { method: "DELETE" })
                    .then(() => item.remove())
                    .catch(err => console.error("Erro ao excluir:", err));
            });
            listaClientes.appendChild(item);
        });
    })
    .catch(err => console.error("Erro ao carregar clientes:", err));

// evento de clique no botão 'Adicionar' (id add)
document.getElementById("add").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!nome || !email) {
        alert("Preencha nome e e-mail");
        return;
    }

    fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome, email: email })
    })
    .then(resposta => resposta.json())
    .then(cliente => {
        const item = document.createElement("li");
        item.innerHTML = `${cliente.nome} - ${cliente.email} <button>Excluir</button>`;
        item.querySelector("button").addEventListener("click", () => {
            fetch(`${apiBase}/${cliente._id}`, { method: "DELETE" })
                .then(() => item.remove())
                .catch(err => console.error("Erro ao excluir:", err));
        });
        listaClientes.appendChild(item);
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    })
    .catch(err => console.error("Erro ao cadastrar:", err));
});