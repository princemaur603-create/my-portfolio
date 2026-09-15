/* ===== SCROLL REVEAL ANIMATION ===== */

function revealSections() {
    const sections = document.querySelectorAll(".reveal");

    sections.forEach(function(section) {
        const windowHeight = window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);

revealSections();

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("active");
}

const texts = [
    "Web Developer",
    "JavaScript Developer",
    "Creative Coder"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const typing = document.getElementById("typing");

    if (!typing) return;

    const currentText = texts[textIndex];

    if (!deleting) {
        typing.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typing.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();

// ===== SCROLL REVEAL ANIMATION =====

const revealElements = document.querySelectorAll(
    "section, .project-card, .skill-card, .about-box"
);

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// AI Assistant

function toggleAssistant() {
    const chat = document.getElementById("aiChat");

    if (chat) {
        chat.classList.toggle("active");
    }
}

async function sendMessage() {
    const input = document.getElementById("aiInput");
    const messages = document.getElementById("aiMessages");

    if (!input || !messages) return;

    const text = input.value.trim();

    if (text === "") return;

    // User message
    const userMessage = document.createElement("div");
    userMessage.className = "ai-message user";
    userMessage.textContent = text;
    messages.appendChild(userMessage);

    input.value = "";

    // Thinking message
    const botMessage = document.createElement("div");
    botMessage.className = "ai-message bot";
    botMessage.textContent = "Thinking... 🤖";
    messages.appendChild(botMessage);

    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        });

        

        const data = await response.json();

     if (data.reply) {
        typeBotMessage(botMessage, data.reply);
     } else{

      

            botMessage.textContent =
                "Sorry, AI response nahi aa paya. 😕";
        }

    } catch (error) {
        console.error(error);

        botMessage.textContent =
            "Server se connection nahi ho pa raha. 😕";
    }

    messages.scrollTop = messages.scrollHeight;
}

// ===== VOICE INPUT =====
   function startVoiceInput() {

    const input = document.getElementById("aiInput");

    if (!("webkitSpeechRecognition" in window)) {
        alert("Voice input is not supported in this browser.");
        return;
    }

    
    const recognition = new webkitSpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {
        input.placeholder = "Listening... 🎤";
    };

    recognition.onresult = function (event) {
        const voiceText = event.results[0][0].transcript;

        input.value = voiceText;
        input.placeholder = "Ask me something...";

        sendMessage();
    };

    recognition.onerror = function () {
        input.placeholder = "Ask me something...";
    };

    recognition.onend = function () {
        input.placeholder = "Ask me something...";
    };

    recognition.start();
}


// ===== AI TYPING ANIMATION =====
function typeBotMessage(element, text) {
    element.textContent = "";

    let i = 0;
    const speed = 25;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;

            setTimeout(type, speed);
        } else {
            element.innerHTML = element.innerHTML
                .replace(
                    /AutoCAD project page/gi,
                    '<a href="autocad.html" target="_blank">AutoCAD project page</a>'
                )
                .replace(
                    /Calculator project page/gi,
                    '<a href="calculator.html" target="_blank">Calculator project page</a>'
                )
                .replace(
                    /Digital Clock project page/gi,
                    '<a href="clock.html" target="_blank">Digital Clock project page</a>'
                )
                .replace(
                    /To-Do List project page/gi,
                    '<a href="todo.html" target="_blank">To-Do List project page</a>'
                );

                speakBotMessage(text);
        }
    }

    type();
}

// ===== VOICE OUTPUT =====
function speakBotMessage(text) {
    if (!("speechSynthesis" in window)) {
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
}
