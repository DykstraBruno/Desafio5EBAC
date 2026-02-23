//CRUD
const url = "https://crudcrud.com/api/5b1dea69f8784bc9b8b7e07c26b66660/clientes" ;

const nome = document.getElementById("nome");
const email = document.getElementById("email");
    if (!nome || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const novoCliente = {
        nome: nome,
        email: email
    };

    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoCliente)
        });

        if (response.ok) {
            alert("Cliente cadastrado com sucesso!");
            // Limpa os campos após o cadastro
            document.getElementById('nome').value = '';
            document.getElementById('email').value = '';
            // Atualiza a lista automaticamente
            listarClientes();
        } else {
            alert("Erro ao cadastrar cliente.");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }

const listar = document.getElementById("listar");

const excluir = document.getElementById("excluir");




