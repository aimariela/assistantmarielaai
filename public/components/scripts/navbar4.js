// Seleccionar el botón del menú y el contenedor del menú
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('[aria-label="toggle menu"]');
    const menuContainer = document.querySelector('[x-cloak]');
  
    // Agregar evento de clic al botón del menú
    menuButton.addEventListener('click', () => {
      const isOpen = menuContainer.classList.contains('translate-x-0');
  
      // Alternar clases para abrir/cerrar el menú
      if (isOpen) {
        menuContainer.classList.remove('translate-x-0', 'opacity-100');
        menuContainer.classList.add('-translate-x-full', 'opacity-0');
      } else {
        menuContainer.classList.remove('-translate-x-full', 'opacity-0');
        menuContainer.classList.add('translate-x-0', 'opacity-100');
      }
    });
  });