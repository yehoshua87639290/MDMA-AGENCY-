let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide'); 

function showSlide(index) {
slides[currentSlide].classList.remove('active');
currentSlide = (index + slides.length) % slides.length;
slides[currentSlide].classList.add('active');
} 

function changeSlide(direction) {
showSlide(currentSlide + direction);
} 

const dots = document.querySelectorAll('.carousel-dot');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

const originalShowSlide = showSlide;
showSlide = (index) => {
	originalShowSlide(index);
	slides.forEach((slide, slideIndex) => {
		slide.setAttribute('aria-hidden', String(slideIndex !== currentSlide));
	});
	dots.forEach((dot, dotIndex) => {
		const isCurrent = dotIndex === currentSlide;
		dot.classList.toggle('active', isCurrent);
		dot.setAttribute('aria-current', String(isCurrent));
	});
};

document.querySelector('.carousel-arrow.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.carousel-arrow.next').addEventListener('click', () => changeSlide(1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

menuToggle.addEventListener('click', () => {
	const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isExpanded));
	menuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
	navigation.classList.toggle('is-open', !isExpanded);
});

navigation.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Abrir menú');
		navigation.classList.remove('is-open');
	});
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Inicializar rotación automática cada 6 segundos para mantener dinamismo corporativo
setInterval(() => {
changeSlide(1);
}, 6000);