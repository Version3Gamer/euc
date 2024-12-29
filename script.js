// Define conversations
const conversations = {
  intro: [
    { name: "Seth", text: "Hey Jade, what are you up to?", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" },
    { name: "Jade", text: "Just testing out this new page!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/jade-voice.mp3" },
    { name: "Seth", text: "Cool, it looks great!", audio: "https://file.garden/Z3ECvbWSDUQChgMv/seth-voice.mp3" },
  ],
};

// Typing function
async function typeText(element, text, audioUrl, delay = 50) {
  const audio = new Audio(audioUrl);
  for (let i = 0; i <= text.length; i++) {
    element.textContent = text.substring(0, i);
    if (i < text.length) audio.play();
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

// Display the conversation
async function displayConversation(conversation) {
  const dialogueBox = document.getElementById("dialogue-box");

  for (const line of conversation) {
    // Create and display character name
    const nameElement = document.createElement("div");
    nameElement.className = "character-name";
    nameElement.textContent = line.name;
    dialogueBox.appendChild(nameElement);

    // Create and type out text
    const textElement = document.createElement("div");
    textElement.className = "text";
    dialogueBox.appendChild(textElement);

    await typeText(textElement, line.text, line.audio);

    // Break line for the next dialogue
    const breakElement = document.createElement("br");
    dialogueBox.appendChild(breakElement);
  }
}

// Start the conversation
document.addEventListener("DOMContentLoaded", () => {
  displayConversation(conversations.intro);
});
