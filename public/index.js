// Manejo de la visibilidad del asistente AI
const toggleAiAssistant = document.getElementById('toggleAiAssistant');
const aiAssistantPanel = document.getElementById('aiAssistantPanel');

toggleAiAssistant.addEventListener('click', () => {
  aiAssistantPanel.classList.toggle('hidden');
  
  // Cambiar el texto del botón
  if (aiAssistantPanel.classList.contains('hidden')) {
    toggleAiAssistant.textContent = 'Open AI Assistant';
  } else {
    toggleAiAssistant.textContent = 'Close AI Assistant';
  }
});

document.getElementById("sendQuestion").addEventListener("click", async () => {
  const message = document.getElementById("userQuestion").value;
  const aiResponse = document.getElementById("aiResponse");

  aiResponse.value = "Thinking...";

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    aiResponse.value = data.response || "No response.";
  } catch (err) {
    aiResponse.value = "Error communicating with assistant.";
    console.error(err);
  }
});
