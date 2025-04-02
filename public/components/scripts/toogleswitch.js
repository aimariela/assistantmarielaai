// This script toggles the switch and changes the background color of the slider and dot based on the checkbox state.
  const checkbox = document.getElementById('toggleSwitch');
  const slider = document.getElementById('switchSlider');
  const dot = document.getElementById('switchDot');

  checkbox.addEventListener('change', function () {
    const isChecked = checkbox.checked;

    if (isChecked) {
      slider.classList.remove('bg-[#CCCCCE]');
      slider.classList.add('bg-[#212b36]');
      dot.classList.add('translate-x-[28px]');
    } else {
      slider.classList.remove('bg-[#212b36]');
      slider.classList.add('bg-[#CCCCCE]');
      dot.classList.remove('translate-x-[28px]');
    }
  });

