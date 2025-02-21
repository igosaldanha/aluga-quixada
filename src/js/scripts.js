const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    let imoveis = [];

    fetch('src/data/imoveis.json')
        .then(response => response.json())
        .then(data => {
            imoveis = data;
            loadProperties(imoveis);
            loadBairros(imoveis);
        })
        .catch(error => console.error('Erro ao carregar os imóveis:', error));

    const loadProperties = (properties) => {
        const propertiesContainer = document.getElementById('properties-container');
        propertiesContainer.innerHTML = '';
        properties.forEach(imovel => {
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

            const saibaMaisButton = document.createElement('a');
            saibaMaisButton.href = "#";
            saibaMaisButton.classList.add('btn', 'saiba-mais-btn');
            saibaMaisButton.textContent = "Saiba Mais";
            saibaMaisButton.innerHTML = `<img src="../src/assets/icons/interrogacao.png" alt="WhatsApp"> Saiba Mais`;

            const propertyContact = document.createElement('a');
            propertyContact.href = `https://wa.me/${imovel.whatsapp.replace(/\D/g, '')}`;
            propertyContact.target = "_blank";
            propertyContact.classList.add('whatsapp-button');
            propertyContact.innerHTML = `<img src="../src/assets/icons/Digital_Glyph_White.png" alt="WhatsApp"> WhatsApp`;

            propertyInfo.appendChild(propertyTitle);
            propertyInfo.appendChild(propertyDescription);
            propertyInfo.appendChild(propertyAddress);
            propertyInfo.appendChild(propertyPrice);
            propertyInfo.appendChild(saibaMaisButton);
            propertyInfo.appendChild(propertyContact);

            propertyCard.appendChild(propertyImage);
            propertyCard.appendChild(propertyInfo);

            propertiesContainer.appendChild(propertyCard);
        });
    };

    const loadBairros = (properties) => {
        const bairros = [...new Set(properties.map(imovel => imovel.address.neighborhood))];
        const filterBairro = document.getElementById('filter-bairro');
        bairros.forEach(bairro => {
            const option = document.createElement('option');
            option.value = bairro;
            option.textContent = bairro;
            filterBairro.appendChild(option);
        });
    };

    const filterProperties = () => {
        const searchBar = document.getElementById('search-bar').value.toLowerCase();
        const filterQuartos = document.querySelector('#filter-quartos button.active')?.dataset.quartos;
        const filterBanheiros = document.querySelector('#filter-banheiros button.active')?.dataset.banheiros;
        const filterGaragem = document.querySelector('#filter-garagem button.active')?.dataset.garagem;
        const filterVaranda = document.querySelector('#filter-varanda button.active')?.dataset.varanda;
        const minPrice = document.getElementById('min-price').value;
        const maxPrice = document.getElementById('max-price').value;
        const minSize = document.getElementById('min-size').value;
        const maxSize = document.getElementById('max-size').value;
        const filterBairro = document.getElementById('filter-bairro').value;

        const filteredProperties = imoveis.filter(imovel => {
            const matchesSearch = imovel.address.street.toLowerCase().includes(searchBar) || imovel.address.neighborhood.toLowerCase().includes(searchBar);
            const matchesQuartos = !filterQuartos || (filterQuartos === '4+' ? imovel.description.quartos >= 4 : imovel.description.quartos == filterQuartos);
            const matchesBanheiros = !filterBanheiros || (filterBanheiros === '4+' ? imovel.description.banheiros >= 4 : imovel.description.banheiros == filterBanheiros);
            const matchesGaragem = !filterGaragem || (filterGaragem === '4+' ? imovel.description.garagem >= 4 : imovel.description.garagem == filterGaragem);
            const matchesVaranda = filterVaranda === undefined || imovel.description.varanda == filterVaranda;
            const matchesPrice = (!minPrice || parseFloat(imovel.rent_value.replace('R$', '').replace('.', '').replace(',', '.')) >= parseFloat(minPrice)) && (!maxPrice || parseFloat(imovel.rent_value.replace('R$', '').replace('.', '').replace(',', '.')) <= parseFloat(maxPrice));
            const matchesSize = (!minSize || imovel.description.tamanho_m2 >= minSize) && (!maxSize || imovel.description.tamanho_m2 <= maxSize);
            const matchesBairro = !filterBairro || imovel.address.neighborhood === filterBairro;

            return matchesSearch && matchesQuartos && matchesBanheiros && matchesGaragem && matchesVaranda && matchesPrice && matchesSize && matchesBairro;
        });

        loadProperties(filteredProperties);
    };

    document.getElementById('search-bar').addEventListener('input', filterProperties);
    document.querySelectorAll('.filter-options button').forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active');
            } else {
                e.target.parentElement.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
            filterProperties();
        });
    });
    document.getElementById('min-price').addEventListener('input', filterProperties);
    document.getElementById('max-price').addEventListener('input', filterProperties);
    document.getElementById('min-size').addEventListener('input', filterProperties);
    document.getElementById('max-size').addEventListener('input', filterProperties);
    document.getElementById('filter-bairro').addEventListener('change', filterProperties);
});