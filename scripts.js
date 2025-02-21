const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('imoveis.json')
        .then(response => response.json())
        .then(data => {
            const propertiesContainer = document.getElementById('properties-container');
            data.forEach(imovel => {
                const propertyCard = document.createElement('div');
                propertyCard.classList.add('property-card');

                const propertyImage = document.createElement('div');
                propertyImage.classList.add('property-image');
                propertyImage.style.backgroundImage = `url(${imovel.image})`;

                const propertyInfo = document.createElement('div');
                propertyInfo.classList.add('property-info');

                const propertyTitle = document.createElement('h3');
                propertyTitle.textContent = imovel.title;

                const propertyDescription = document.createElement('p');
                propertyDescription.textContent = `Quartos: ${imovel.description.quartos}, Banheiros: ${imovel.description.banheiros}, Garagem: ${imovel.description.garagem}, Varanda: ${imovel.description.varanda}, Tamanho: ${imovel.description.tamanho_m2}m²`;

                const propertyAddress = document.createElement('p');
                propertyAddress.textContent = `${imovel.address.street}, ${imovel.address.number} - ${imovel.address.neighborhood}, ${imovel.address.city} - ${imovel.address.state}, CEP: ${imovel.address.cep}`;

                const propertyPrice = document.createElement('p');
                propertyPrice.textContent = `Preço: ${imovel.rent_value}`;

                const propertyContact = document.createElement('p');
                propertyContact.textContent = `WhatsApp: ${imovel.whatsapp}`;

                propertyInfo.appendChild(propertyTitle);
                propertyInfo.appendChild(propertyDescription);
                propertyInfo.appendChild(propertyAddress);
                propertyInfo.appendChild(propertyPrice);
                propertyInfo.appendChild(propertyContact);

                propertyCard.appendChild(propertyImage);
                propertyCard.appendChild(propertyInfo);

                propertiesContainer.appendChild(propertyCard);
            });
        })
        .catch(error => console.error('Erro ao carregar os imóveis:', error));
});