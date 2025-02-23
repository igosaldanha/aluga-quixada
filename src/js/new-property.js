$(document).ready(function () {
    $('.cep-mask').mask('00000-000');
    $('.whatsapp-mask').mask('(00) 00000-0000');
    $('.rent-mask').mask('R$ 000.000,00', { reverse: true });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cep").addEventListener("blur", function() {
        var cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById("street").value = data.logradouro;
                        document.getElementById("neighborhood").value = data.bairro;
                        document.getElementById("city").value = data.localidade;
                        document.getElementById("state").value = data.uf;
                    } else {
                        alert("CEP não encontrado.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar o CEP:", error);
                    alert("Erro ao buscar o CEP.");
                });
        } else {
            alert("Formato de CEP inválido.");
        }
    });
});

document.getElementById("submit-btn").addEventListener("click", function(event) {
    event.preventDefault();
    
    const imovel = {
        id: Date.now(),
        title: document.getElementById("title").value,
        description: {
            quartos: parseInt(document.getElementById("quartos").value),
            banheiros: parseInt(document.getElementById("banheiros").value),
            garagem: parseInt(document.getElementById("garagem").value),
            varanda: parseInt(document.getElementById("varanda").value),
            tamanho_m2: parseInt(document.getElementById("tamanho_m2").value)
        },
        address: {
            cep: document.getElementById("cep").value,
            street: document.getElementById("street").value,
            number: document.getElementById("number").value,
            neighborhood: document.getElementById("neighborhood").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value
        },
        whatsapp: document.getElementById("whatsapp").value,
        rent_value: document.getElementById("rent_value").value,
        image: document.getElementById("image").files[0] ? document.getElementById("image").files[0].name : ""
    };

    fetch("http://localhost:3000/submit-imovel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imovel)
    })

    .then(response => response.json())
    .then(data => alert("Imóvel cadastrado com sucesso!"))
    .catch(error => alert("Erro ao cadastrar o imóvel."));
});
