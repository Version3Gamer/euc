// Get the conversation ID from the URL
const params = new URLSearchParams(window.location.search);
const conversationId = params.get('conversation');

// Fetch the JSON file
fetch("https://your-hosting-site.com/conversations.json") // Replace with your JSON file's URL
  .then((response) => response.json())
  .then((data) => {
    const lines = data[conversationId] || [];
    let delay = 0;

    lines.forEach((line) => {
      const container = document.getElementById("conversation");

      // Create a dialogue line
      const dialogueLine = document.createElement("div");
      dialogueLine.classList.add("dialogue-line");

      const nameElement = document.createElement("span");
      nameElement.classList.add("character-name");
      nameElement.textContent = `${line.name}: `;

      const textElement = document.createElement("span");
      textElement.classList.add("text");

      dialogueLine.appendChild(nameElement);
      dialogueLine.appendChild(textElement);
      container.appendChild(dialogueLine);

      // Play typing animation with audio
      setTimeout(() => {
        let charIndex = 0;
        textElement.textContent = ""; // Clear text for animation
        const audio = new Audio(line.audio);

        const typeInterval = setInterval(() => {
          if (charIndex < line.text.length) {
            textElement.textContent += line.text[charIndex];
            charIndex++;
            audio.play(); // Play audio per letter
          } else {
            clearInterval(typeInterval);
          }
        }, 100); // Adjust typing speed here
      }, delay);

      // Adjust timing for the next line
      delay += line.text.length * 100 + 1000;
    });
  })
  .catch((error) => console.error("Error fetching conversation:", error));
