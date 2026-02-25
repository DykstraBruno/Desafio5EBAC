const clientes = document.getElementById("clientes");

fetch("https://crudcrud.com/api/5b1dea69f8784bc9b8b7e07c26b66660/clientes")
.then(resposta=> resposta.json())
.then((clientesCadastrados) => {

    clientesCadastrados.forEach(clientes => {
        
        const nome = document.getElementById("nome");
        item.innerHTML = `${clientes.cadastrar} <button>Excluir</button>`;
        clientes.appendChild(item);
    });
})
  