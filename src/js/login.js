document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('login-toggle');
    const signupToggle = document.getElementById('signup-toggle');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginToggle.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
    });

    signupToggle.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('../data/advertising-user.json')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    showPopup('Login bem-sucedido!', 'success');
                    setTimeout(() => {
                        window.location.href = `advertising-user-dashboard.html?id=${user.id}`;
                    }, 2000);
                } else {
                    showPopup('Usuário ou senha incorretos.', 'error');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do usuário:', error);
                showPopup('Erro ao carregar os dados do usuário.', 'error');
            });
    });

    const showPopup = (message, type) => {
        const popup = document.createElement('div');
        popup.classList.add('popup', type);
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    };
});