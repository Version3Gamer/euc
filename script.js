// Conversations with scenes
const conversations = {
  intro: [
    { name: "Seth", text: "Hey Jade, what are you up to?", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" },
    { name: "Jade", text: "Just testing out this new page!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3" }
  ],
  battleScene: [
    { name: "Seth", text: "Ready for the fight?", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" },
    { name: "Jade", text: "Let's do this!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3" }
  ]
};

// Typing function with sound synchronization
function typeText(container, text, audioURL, callback) {
  const textElement = document.createElement("span");
  container.appendChild(textElement);

  let index = 0;
  const audio = new Audio(audioURL);

  function typeLetter() {
    if (index < text.length) {
      textElement.textContent += text[index];
      audio.currentTime = 0; // Reset audio for each letter
      audio.play();
      index++;
      setTimeout(typeLetter, 50); // Typing speed
    } else if (callback) {
      callback();
    }
  }

  typeLetter();
}

// Function to display a conversation
function displayConversation(conversation) {
  const conversationContainer = document.getElementById("conversation");
  conversationContainer.innerHTML = ""; // Clear previous content

  let index = 0;

  function nextLine() {
    if (index < conversation.length) {
      const line = conversation[index];
      const lineContainer = document.createElement("div");
      lineContainer.className = "dialogue-line";

      const nameElement = document.createElement("span");
      nameElement.className = "character-name";
      nameElement.textContent = `${line.name}: `;

      lineContainer.appendChild(nameElement);
      conversationContainer.appendChild(lineContainer);

      typeText(lineContainer, line.text, line.audio, nextLine);
      index++;
    }
  }

  nextLine();
}

// Function to get the scene from the URL
function getSceneFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("scene") || "intro"; // Default to "intro"
}

// Load the appropriate scene
document.addEventListener("DOMContentLoaded", () => {
  const scene = getSceneFromURL();
  if (conversations[scene]) {
    displayConversation(conversations[scene]);
  } else {
    console.error(`Scene "${scene}" not found.`);
  }
});
