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
        
        document.getElementById('property-image').style.backgroundImage = `url(../${imovel.image})`
        document.getElementById('property-title').textContent = imovel.title;
        document.getElementById('property-description').textContent = `Quartos: ${imovel.description.quartos}, Banheiros: ${imovel.description.banheiros}, Garagem: ${imovel.description.garagem}, Varanda: ${imovel.description.varanda}, Tamanho: ${imovel.description.tamanho_m2}m²`;
        document.getElementById('property-address').textContent = `${imovel.address.street}, ${imovel.address.number} - ${imovel.address.neighborhood}, ${imovel.address.city} - ${imovel.address.state}, CEP: ${imovel.address.cep}`;
        document.getElementById('property-price').textContent = `Preço: ${imovel.rent_value}`;
        document.getElementById('property-contact').href = `https://wa.me/${imovel.whatsapp.replace(/\D/g, '')}`;
    };

    

});