// Conversation data
const conversations = {
  intro: [
    { name: "Seth", text: "Hey Jade, what are you up to?", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" },
    { name: "Jade", text: "Just testing out this new page!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3" },
    { name: "Seth", text: "Cool, it looks great!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" }
  ],
  battleScene: [
    { name: "Seth", text: "Ready for the fight?", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" },
    { name: "Jade", text: "Let's do this!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3" }
  ]
};

// Typing function with sound synchronization
function typeText(container, text, audioURL, callback) {
  let index = 0;
  const audio = new Audio(audioURL);

  function typeLetter() {
    if (index < text.length) {
      container.textContent += text[index];
      audio.currentTime = 0; // Reset audio for each letter
      audio.play();
      index++;
      setTimeout(typeLetter, 50); // Adjust typing speed here
    } else if (callback) {
      callback();
    }
  }

  typeLetter();
}

// Display conversation function
function displayConversation(conversation) {
  const conversationContainer = document.getElementById("conversation");
  conversationContainer.innerHTML = ""; // Clear existing content

  let index = 0;

  function nextLine() {
    if (index < conversation.length) {
      const line = conversation[index];

      const lineContainer = document.createElement("div");
      lineContainer.className = "dialogue-line";

      const nameElement = document.createElement("span");
      nameElement.className = "character-name";
      nameElement.textContent = `${line.name}: `;

      const textElement = document.createElement("span");
      textElement.className = "text";

      lineContainer.appendChild(nameElement);
      lineContainer.appendChild(textElement);
      conversationContainer.appendChild(lineContainer);

      typeText(textElement, line.text, line.audio, nextLine);
      index++;
    }
  }

  nextLine();
}

// Get scene from URL
function getSceneFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("scene") || "intro"; // Default to "intro"
}

// Initialize conversation
document.addEventListener("DOMContentLoaded", () => {
  const scene = getSceneFromURL();
  if (conversations[scene]) {
    displayConversation(conversations[scene]);
  } else {
    console.error(`Scene "${scene}" not found.`);
  }
});
