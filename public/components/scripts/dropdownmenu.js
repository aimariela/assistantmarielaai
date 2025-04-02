// Dropdown Menu Script
  const button = document.getElementById('dropdownButton');
  const menu = document.getElementById('dropdownMenu');
  const wrapper = document.getElementById('dropdownWrapper');

  button.addEventListener('click', () => {
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('invisible');
  });

  document.addEventListener('click', (event) => {
    if (!wrapper.contains(event.target)) {
      menu.classList.add('opacity-0');
      menu.classList.add('invisible');
    }
  });

