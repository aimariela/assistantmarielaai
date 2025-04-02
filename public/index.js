document.addEventListener('alpine:init', () => {
    // Alpine component for hamburguer
    Alpine.data('hamburguer', () => ({
        isOpen: false,
        toggle() {
            this.isOpen = !this.isOpen
        }
    }))
})


// Obtener elementos del DOM
const checkbox = document.getElementById('toggleSwitch');
const slider = document.getElementById('switchSlider');
const dot = document.getElementById('switchDot');
const html = document.documentElement;

// Comprobar si existe una preferencia guardada
const darkMode = localStorage.getItem('darkMode');

// Inicializar el tema basado en la preferencia guardada
if (darkMode === 'enabled') {
    enableDarkMode();
    checkbox.checked = true;
    slider.classList.remove('bg-[#CCCCCE]');
    slider.classList.add('bg-[#212b36]');
    dot.classList.add('translate-x-[28px]');
}

// Escucha el cambio en el switch
checkbox.addEventListener('change', function() {
    const isChecked = checkbox.checked; 
    if (isChecked) {
        enableDarkMode();
        slider.classList.remove('bg-[#CCCCCE]');
        slider.classList.add('bg-[#212b36]');
        dot.classList.add('translate-x-[28px]');
    } else {
        disableDarkMode();
        slider.classList.remove('bg-[#212b36]');
        slider.classList.add('bg-[#CCCCCE]');
        dot.classList.remove('translate-x-[28px]');
    }
});

// Función para activar el modo oscuro
function enableDarkMode() {
    html.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
}

// Función para desactivar el modo oscuro
function disableDarkMode() {
    html.classList.remove('dark');
    localStorage.setItem('darkMode', 'disabled');
}