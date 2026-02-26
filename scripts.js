// 1. Seleciona a lista do seu HTML
const listaDeExibicao = document.getElementById("listaClientes");

// 2. CORREÇÃO: Adicionado /clientes ao final da URL
const API_URL = "https://crudcrud.com/api/e9956767cf6843e8a11a0c526d31b85c/clientes";

// 1. BUSCAR CLIENTES (GET)
fetch(API_URL)
    .then(resposta => {
        if (!resposta.ok) throw new Error("Erro na requisição ou link inválido");
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
    .then(resposta => {
        if (!resposta.ok) throw new Error("Erro ao cadastrar");
        return resposta.json();
    })
    .then((novoCliente) => {
        const item = document.createElement("li");
        item.innerHTML = `${novoCliente.nome} (${novoCliente.email}) <button>X</button>`;
        listaDeExibicao.appendChild(item);

        const botaoExcluir = item.querySelector("button");
        botaoExcluir.addEventListener("click", () => {
            // CORREÇÃO: Usando a variável API_URL de forma limpa
            fetch(`${API_URL}/${novoCliente._id}`, {
                method: "DELETE"
            }).then(() => item.remove());
        });
        
        // Limpa os campos após o cadastro
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    })
    .catch(erro => console.error("Erro ao cadastrar:", erro));
});
