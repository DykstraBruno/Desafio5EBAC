// 1. Seleciona a lista do seu HTML
const listaDeExibicao = document.getElementById("listaClientes");

// 2. ATENÇÃO: Você precisa gerar um NOVO LINK no crudcrud.com e substituir abaixo
// O link deve terminar com /clientes para funcionar
const API_URL = "https://crudcrud.com";

// 1. BUSCAR CLIENTES (GET)
fetch(API_URL)
    .then(resposta => {
        if (!resposta.ok) throw new Error("Link expirado ou inválido");
        return resposta.json();
    })
    .then((clientes) => {
        clientes.forEach(cliente => {
            const item = document.createElement("li");
            item.innerHTML = `${cliente.nome} (${cliente.email}) <button>X</button>`;
            listaDeExibicao.appendChild(item);

            const botaoExcluir = item.querySelector("button");
            botaoExcluir.addEventListener("click", () => {
                fetch(`${API_URL}/${cliente._id}`, {
                    method: "DELETE"
                }).then(() => item.remove());
            });
        });
    })
    .catch(erro => console.error("Erro ao carregar:", erro));

// 2. ADICIONAR CLIENTE (POST)
document.getElementById("add").addEventListener("click", () => {
    const nomeInput = document.getElementById("nome").value;
    const emailInput = document.getElementById("email").value;

    if (!nomeInput || !emailInput) return alert("Preencha todos os campos!");

    fetch(API_URL, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeInput, email: emailInput })
    })
    .then(resposta => resposta.json())
    .then((novoCliente) => {
        const item = document.createElement("li");
        item.innerHTML = `${novoCliente.nome} (${novoCliente.email}) <button>X</button>`;
        listaDeExibicao.appendChild(item);

        const botaoExcluir = item.querySelector("button");
        botaoExcluir.addEventListener("click", () => {
            // CORREÇÃO: Removido o erro de chaves duplas e link fixo
            fetch(`${API_URL}/${novoCliente._id}`, {
                method: "DELETE"
            }).then(() => item.remove());
        });
        
        // Limpa os campos após o cadastro
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    })
    .catch(erro => alert("Erro ao cadastrar. Verifique o link da API."));
});
