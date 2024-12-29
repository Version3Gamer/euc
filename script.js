// Conversation data
const conversations = {
  intro: [
    { name: "Seth", text: "Hey Jade, I did it!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3", nameColor: "#FF0000" },
    { name: "Seth", text: "Although, I don't think I've got my voice just yet...", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3", nameColor: "#FF0000" },
    { name: "Jade", text: "Haha LOL you sound like SANS from U... Wait a second.........", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3", nameColor: "#679954" },
    { name: "Seth", text: "Cool, now we both have placeholder voices for super duper special scenes that need to use this... BULLSHIT!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3", nameColor: "#FF0000" },
    { name: "Jade", text: "That's quite the naughty word.", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3", nameColor: "#679954" },
    { name: "Seth", text: "kys.", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3", nameColor: "#FF0000" }
  ],
  battleScene: [
    { name: "Seth", text: "Ready for the fight?", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3", nameColor: "#FF0000" },
    { name: "Jade", text: "Let's do this!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3", nameColor: "#679954" }
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
      setTimeout(typeLetter, 50); // Typing speed
    } else if (callback) {
      callback();
    }
  }

  typeLetter();
}

// Display conversation function with delay
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
      nameElement.style.color = line.nameColor || "#000000"; // Default to black if no color provided

      const textElement = document.createElement("span");
      textElement.className = "text";

      lineContainer.appendChild(nameElement);
      lineContainer.appendChild(textElement);
      conversationContainer.appendChild(lineContainer);

      typeText(textElement, line.text, line.audio, () => {
        index++;
        setTimeout(nextLine, 1000); // Delay before the next line starts
      });
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
