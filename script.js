// Alterar cor do header ao rolar a página
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scroll');
    } else {
        header.classList.remove('scroll');
    }
});

// Marca o link ativo na navegação
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(a => {
        // Verifica se o href corresponde à página atual
        // Se for a home (index ou vazio), marca a home
        if (a.getAttribute('href') === currentPage || (currentPage === '' && a.getAttribute('href') === 'index.html')) {
            a.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNav();

    // Menu Mobile Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));

            // Animação do ícone hamburger
            if (isOpen) {
                navToggle.classList.add('active');
            } else {
                navToggle.classList.remove('active');
            }
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Resetar ao redimensionar tela
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Lógica do Formulário de WhatsApp
const whatsappForm = document.getElementById('whatsapp-form');

if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const servico = document.getElementById('servico').value;
        const mensagem = document.getElementById('message').value;

        // SEU NÚMERO AQUI (formato internacional sem +)
        const telefone = "5511970152735";

        const texto = `*Novo Contato do Site*\n\n` +
            `👤 *Nome:* ${nome}\n` +
            `📧 *E-mail:* ${email}\n` +
            `🏢 *Interesse:* ${servico}\n` +
            `💬 *Mensagem:* ${mensagem}`;

        const textoEncoded = encodeURIComponent(texto);
        const url = `https://wa.me/${telefone}?text=${textoEncoded}`;

        window.open(url, '_blank');
    });
}

// Animação de entrada dos cards (Fade Up)
const cards = document.querySelectorAll('.card');
if (cards.length > 0) {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        // Adiciona um delay escalonado para cada card (efeito cascata)
        card.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(card);
    });
}