document.addEventListener('DOMContentLoaded', () => {
    const userId = new URLSearchParams(window.location.search).get('id');

    fetch('../data/advertising-user.json')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.id == userId);
            if (user) {
                loadUserInfo(user);
                loadUserProperties(user.imoveis);
                populateEditForm(user);
            } else {
                console.error('Usuário não encontrado');
            }
        })
        .catch(error => console.error('Erro ao carregar os dados do usuário:', error));

    const loadUserInfo = (user) => {
        document.getElementById('user-photo').src = `../assets/user-images/${user.photo}`;
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-email').innerHTML = `<i class="fas fa-envelope"></i>${user.email}`;
        document.getElementById('user-phone').innerHTML = `<i class="fas fa-phone"></i>${user.phone}`;
        document.getElementById('user-whatsapp').innerHTML = `<i class="fab fa-whatsapp"></i>${user.whatsapp}`;
        document.getElementById('user-address').innerHTML = `<i class="fas fa-map-marker-alt"></i>${user.address.street}, ${user.address.number} - ${user.address.neighborhood}, ${user.address.city} - ${user.address.state}, CEP: ${user.address.cep}`;
    };

    const loadUserProperties = (propertyIds) => {
        fetch('../data/property.json')
            .then(response => response.json())
            .then(properties => {
                const userProperties = properties.filter(property => propertyIds.includes(property.id));
                const propertiesList = document.getElementById('properties-list');
                userProperties.forEach(property => {
                    const propertyCard = document.createElement('div');
                    propertyCard.classList.add('property-card');

                    const propertyImage = document.createElement('img');
                    propertyImage.src = `../assets/images/${property.image}`;
                    propertyImage.alt = property.title;

                    const propertyTitle = document.createElement('h4');
                    propertyTitle.textContent = property.title;

                    const propertyDetails = document.createElement('p');
                    propertyDetails.innerHTML = `
                        <div class="icon-property"><i class="fas fa-bed"></i>${property.description.quartos}</div>
                        <div class="icon-property"><i class="fas fa-bath"></i> ${property.description.banheiros}</div>
                        <div class="icon-property"><i class="fas fa-car"></i> ${property.description.garagem}</div>
                        <div class="icon-property"><i class="fas fa-umbrella-beach"></i> ${property.description.varanda}</div>
                        <div class="icon-property"><i class="fas fa-ruler-combined"></i> ${property.description.tamanho_m2}m²</div>
                    `;

                    const propertyActions = document.createElement('div');
                    propertyActions.classList.add('property-actions');

                    const editButton = document.createElement('button');
                    editButton.classList.add('btn-edit');
                    editButton.textContent = 'Editar';
                    editButton.addEventListener('click', () => {
                        alert('Função de editar imóvel ainda não implementada.');
                    });

                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('btn-delete');
                    deleteButton.textContent = 'Excluir';
                    deleteButton.addEventListener('click', () => {
                        // Lógica para excluir imóvel
                        alert('Função de excluir imóvel ainda não implementada.');
                    });

                    propertyActions.appendChild(editButton);
                    propertyActions.appendChild(deleteButton);

                    propertyCard.appendChild(propertyImage);
                    propertyCard.appendChild(propertyTitle);
                    propertyCard.appendChild(propertyDetails);
                    propertyCard.appendChild(propertyActions);

                    propertiesList.appendChild(propertyCard);
                });
            })
            .catch(error => console.error('Erro ao carregar os imóveis:', error));
    };

    const populateEditForm = (user) => {
        document.getElementById('edit-name').value = user.name;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-phone').value = user.phone;
        document.getElementById('edit-whatsapp').value = user.whatsapp;
        document.getElementById('edit-address').value = `${user.address.street}, ${user.address.number} - ${user.address.neighborhood}, ${user.address.city} - ${user.address.state}, CEP: ${user.address.cep}`;
    };

    document.getElementById('new-property').addEventListener('click', () => {
        window.location.href = 'new-property.html';
    });

    document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Lógica para salvar as alterações do perfil
        alert('Função de editar perfil ainda não implementada.');
    });

    document.getElementById('delete-account').addEventListener('click', () => {
        // Lógica para excluir conta
        alert('Função de excluir conta ainda não implementada.');
    });
});