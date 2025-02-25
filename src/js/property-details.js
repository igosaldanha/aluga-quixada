document.addEventListener('DOMContentLoaded', () => {
    const propertyId = new URLSearchParams(window.location.search).get('id');
    let imoveis = [];

    fetch('../data/property.json')
        .then(response => response.json())
        .then(data => {
            imoveis = data;
            const imovel = imoveis.find(imovel => imovel.id == propertyId);
            if (imovel) {
                loadPropertyDetails(imovel);
            } else {
                console.error('Imóvel não encontrado');
            }
        })
        .catch(error => console.error('Erro ao carregar os imóveis:', error));

    const loadPropertyDetails = (imovel) => {
        document.getElementById('property-image').innerHTML = `<img class="property-images" src="../assets/images/${imovel.image}" alt="Imagem do imóvel">`;
        document.getElementById('property-title').textContent = imovel.title;
        document.getElementById('property-description').innerHTML = `
            <div class="description-icon"><i class="fas fa-bed"></i> ${imovel.description.quartos}</div>
            <div class="description-icon"><i class="fas fa-bath"></i> ${imovel.description.banheiros}</div>
            <div class="description-icon"><i class="fas fa-car"></i> ${imovel.description.garagem}</div>
            <div class="description-icon"><i class="fas fa-umbrella-beach"></i> ${imovel.description.varanda}</div>
            <div class="description-icon"><i class="fas fa-ruler-combined"></i> ${imovel.description.tamanho_m2}m²</div>
        `;
        document.getElementById('property-address').textContent = `${imovel.address.street}, ${imovel.address.number} - ${imovel.address.neighborhood}, ${imovel.address.city} - ${imovel.address.state}, CEP: ${imovel.address.cep}`;
        document.getElementById('property-price').textContent = `Preço: ${imovel.rent_value}`;
        document.getElementById('property-contact').href = `https://wa.me/${imovel.whatsapp.replace(/\D/g, '')}`;
    };
});