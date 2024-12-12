document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const languageScreen = document.getElementById("language-screen");
    const guideScreen = document.getElementById("character-screen");
    const fourthScreen = document.getElementById("fourth-screen");
    const screenFive = document.getElementById("screen-five");

    const startButton = document.getElementById("start-button");
    const languageButtons = document.querySelectorAll(".language-item");
    const menuButton = document.getElementById("menu-button");
    const menuDropdown = document.getElementById("menu-dropdown");

    let currentLanguage = "english";
    let currentCharacterColor = "darkgreen"; // Default color
    let userName = ""; // Variable to store the user's name from Screen 4
    let fontSize = 16; // Default font size
    let currentCharacterImage = "blue-monster"; // Default character

    // Language options
    const languages = {
        english: "Select your language",
        spanish: "Selecciona tu idioma",
        turkish: "Dilini seç",
        german: "Wählen Sie Ihre Sprache",
        dutch: "Selecteer je taal"
    };

    // Fourth Screen Translations
    const fourthScreenTranslations = {
        english: "What can I call you all?",
        spanish: "¿Cómo puedo llamarte?",
        turkish: "Size ne diyebilirim?",
        german: "Wie kann ich dich nennen?",
        dutch: "Hoe kan ik je noemen?"
    };

    // Greeting translations for Screen 5
    const greetingTranslations = {
        english: "Hey {name}! I'll be your guide today. I'm here to help you uncover hidden details, fascinating facts about the artists and dive deeper into their masterpieces.",
        spanish: "¡Hola {name}! Seré tu guía hoy. Estoy aquí para ayudarte a descubrir detalles ocultos, hechos fascinantes sobre los artistas y profundizar en sus obras maestras.",
        turkish: "{name}! Bugün senin rehberin olacağım. Sadece gizli detayları keşfetmene değil, sanatçılar hakkında ilginç gerçekleri öğrenmene ve onların şaheserlerine daha derinlemesine dalmana da yardımcı olmak için buradayım.",
        german: "Hey {name}! Ich werde heute dein Führer sein. Ich bin hier, um dir zu helfen, versteckte Details, faszinierende Fakten über die Künstler zu entdecken und tiefer in ihre Meisterwerke einzutauchen.",
        dutch: "Hey {name}! Ik zal je gids zijn vandaag. Ik ben hier om je te helpen verborgen details, fascinerende feiten over de kunstenaars te onthullen en dieper in hun meesterwerken te duiken."
    };

    // Translations for Buttons
    const buttonTranslations = {
        done: {
            english: "Done",
            spanish: "Hecho",
            turkish: "Tamam",
            german: "Fertig",
            dutch: "Klaar"
        },
        next: {
            english: "Next",
            spanish: "Siguiente",
            turkish: "İleri",
            german: "Nächste",
            dutch: "Volgende"
        }
    };

    // Transition to Language Screen
    startButton.addEventListener("click", () => {
        welcomeScreen.classList.remove("active");
        languageScreen.classList.add("active");
    });

    // Handle Language Selection
    languageButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            currentLanguage = e.target.id;
            languageScreen.classList.remove("active");
            guideScreen.classList.add("active");

            const guideText = guideScreen.querySelector(".choose-guide-text");
            guideText.textContent = {
                english: "Choose your guide!",
                spanish: "¡Elige tu guía!",
                turkish: "Rehberini seç!",
                german: "Wählen Sie Ihren Führer!",
                dutch: "Kies je gids!"
            }[currentLanguage];

            document.getElementById("done-button").textContent = buttonTranslations.done[currentLanguage];
            document.getElementById("next-button").textContent = buttonTranslations.next[currentLanguage];

            const nameInput = document.getElementById("user-name");
            nameInput.placeholder = {
                english: "Enter your name",
                spanish: "Introduce tu nombre",
                turkish: "Adınızı girin",
                german: "Gib deinen Namen ein",
                dutch: "Voer je naam in"
            }[currentLanguage];
        });
    });

    // Character Selection Screen Functionality
    const characterImages = [
        "blue-monster",
        "yellow-monster",
        "goblin-monster",
        "knight-monster",
        "thumb-monster",
        "santa-monster"
    ];

    let currentCharacterIndex = 0;
    const characterDisplay = document.getElementById("current-character");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const doneButton = document.getElementById("done-button");

    function updateCharacter() {
        characterDisplay.src = `${characterImages[currentCharacterIndex]}.png`; // Update character image
        characterDisplay.alt = characterImages[currentCharacterIndex].replace("-", " ");

        currentCharacterImage = characterImages[currentCharacterIndex]; // Store the selected character for later use

        const characterBannerText = document.getElementById("banner-text");
        characterBannerText.textContent = fourthScreenTranslations[currentLanguage];

        const banner = document.getElementById("character-banner");
        switch (currentCharacterIndex) {
            case 0: currentCharacterColor = "rgba(0, 0, 255, 0.8)"; break; // Blue
            case 1: currentCharacterColor = "rgba(255, 255, 0, 0.8)"; break; // Yellow
            case 2: currentCharacterColor = "rgba(0, 255, 0, 0.8)"; break; // Green
            case 3: currentCharacterColor = "rgba(128, 0, 128, 0.8)"; break; // Purple
            case 4: currentCharacterColor = "rgba(255, 165, 0, 0.8)"; break; // Orange
            case 5: currentCharacterColor = "rgba(255, 0, 0, 0.8)"; break; // Red
        }
        banner.style.backgroundColor = currentCharacterColor;

        // Update Screen 5 Character Banner
        const characterColorBanner = document.getElementById("character-color-banner");
        characterColorBanner.style.backgroundColor = currentCharacterColor;

        const leftMonsterImage = document.getElementById("character-left-image");
        leftMonsterImage.src = `${characterImages[currentCharacterIndex]}.png`; // Update left monster image
        leftMonsterImage.style.position = 'absolute';
        leftMonsterImage.style.top = '300px';
        leftMonsterImage.style.left = "0";
        leftMonsterImage.style.zIndex = '10';
        leftMonsterImage.style.width = "200px";
        leftMonsterImage.style.height = "auto";
    }

    leftArrow.addEventListener("click", () => {
        currentCharacterIndex = (currentCharacterIndex - 1 + characterImages.length) % characterImages.length;
        updateCharacter();
    });

    rightArrow.addEventListener("click", () => {
        currentCharacterIndex = (currentCharacterIndex + 1) % characterImages.length;
        updateCharacter();
    });

    // Initialize the character display with the blue monster on load
    updateCharacter(); // Initialize the image display

    // Done Button Functionality
    doneButton.addEventListener("click", () => {
        guideScreen.classList.remove("active");
        fourthScreen.classList.add("active");
        updateCharacter();
    });

    // Back Button Functionality for Guide Screen
    const backButton1 = document.getElementById("back-button-1");
    backButton1.addEventListener("click", () => {
        guideScreen.classList.remove("active");
        languageScreen.classList.add("active");
    });

    // Back Button Functionality for Fourth Screen
    const backButton2 = document.getElementById("back-button-2");
    backButton2.addEventListener("click", () => {
        fourthScreen.classList.remove("active");
        guideScreen.classList.add("active");
    });

    // Back Button Functionality for Screen 5
    const backButton3 = document.getElementById("back-button-3");
    backButton3.addEventListener("click", () => {
        screenFive.classList.remove("active");
    });

    // Next Button Functionality on Fourth Screen
    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", () => {
        userName = document.getElementById("user-name").value || ""; // Get user name input from Screen 4
        fourthScreen.classList.remove("active");
        screenFive.classList.add("active");

        const greetingTextElement = document.getElementById("greeting-text");

        // Update the image src for Screen 5 to reflect the selected character
        const characterImageElement = document.getElementById("character-image");
        characterImageElement.src = `${currentCharacterImage}.png`; // Display the selected character

        // Check if currentLanguage is valid
        if (greetingTranslations[currentLanguage]) {
            greetingTextElement.textContent = greetingTranslations[currentLanguage].replace("{name}", userName); // Display updated greeting
        } else {
            console.error("Invalid language selected:", currentLanguage);
            greetingTextElement.textContent = "Hello!"; // Fallback greeting
        }
    });

    // Font Size Adjustment
    const fontIncreaseButton = document.getElementById("font-increase");
    const fontDecreaseButton = document.getElementById("font-decrease");

    menuButton.addEventListener("click", () => {
        menuDropdown.classList.toggle("active"); // Toggle the menu panel visibility
    });

    fontIncreaseButton.addEventListener("click", () => {
        fontSize += 1;
        document.body.style.fontSize = `${fontSize}px`; // Fixed: Used backticks for string interpolation
    });

    fontDecreaseButton.addEventListener("click", () => {
        fontSize = Math.max(12, fontSize - 1); // Prevent font size from going below 12px
        document.body.style.fontSize = `${fontSize}px`; // Fixed: Used backticks for string interpolation
    });

    // Add event listeners to photo buttons
    const underworldButton = document.getElementById("underworld-button");
    const overworldButton = document.getElementById("overworld-button");
    const speculumButton = document.getElementById("speculum-button");
    const finalShowButton = document.getElementById("final-show-button");

    const photoButtons = document.querySelectorAll('.photo-button');
    photoButtons.forEach(button => {
       button.style.width = '100%';
       button.style.margin = '10px 0';
    });

    // Underworld Screen
    underworldButton.addEventListener("click", () => {
        screenFive.classList.remove("active");
        const underworldScreen = document.getElementById("underworld-screen");
        underworldScreen.classList.add("active");

        const menuButtonUnderworld = document.getElementById("menu-button-underworld");
        const menuDropdownUnderworld = document.getElementById("menu-dropdown-underworld");

        if (menuButtonUnderworld) {
            menuButtonUnderworld.addEventListener("click", () => {
                menuDropdownUnderworld.classList.toggle("active");
            });

            const backButtonUnderworld = document.createElement("button");
            backButtonUnderworld.innerHTML = "<";
            backButtonUnderworld.classList.add("back-button");
            backButtonUnderworld.style.cssText = `
                position: absolute;
                top: calc(1.8cm + 3cm);
                left: 20px;
                font-size: 30px;
                z-index: 1;
              `;
            underworldScreen.insertBefore(backButtonUnderworld, underworldScreen.firstChild);

            backButtonUnderworld.addEventListener("click", () => {
                underworldScreen.classList.remove("active"); // Hide Underworld
                screenFive.classList.add("active"); // Return to Screen 5
            });
        }
    });

    // Overworld screen
    overworldButton.addEventListener("click", () => {
        screenFive.classList.remove("active");
        const overworldScreen = document.getElementById("overworld-screen");
        overworldScreen.classList.add("active");

        const menuButtonOverworld = document.getElementById("menu-button-overworld");
        const menuDropdownOverworld = document.getElementById("menu-dropdown-overworld");

        if (menuButtonOverworld) {
            menuButtonOverworld.addEventListener("click", () => {
                menuDropdownOverworld.classList.toggle("active");
            });

            const backButtonOverworld = document.createElement("button");
            backButtonOverworld.innerHTML = "<";
            backButtonOverworld.classList.add("back-button");
            backButtonOverworld.style.cssText = `
              position: absolute;
              top: calc(1.8cm + 3cm);
              left: 20px;
              font-size: 30px;
              z-index: 1;
            `;
            overworldScreen.insertBefore(backButtonOverworld, overworldScreen.firstChild);

            backButtonOverworld.addEventListener("click", () => {
                overworldScreen.classList.remove("active");
                screenFive.classList.add("active");
            });
        }
    });

    // Speculum screen
    speculumButton.addEventListener("click", () => {
        screenFive.classList.remove("active");
        const speculumScreen = document.getElementById("speculum-screen");
        speculumScreen.classList.add("active");

        const menuButtonSpeculum = document.getElementById("menu-button-speculum");
        const menuDropdownSpeculum = document.getElementById("menu-dropdown-speculum");

        if (menuButtonSpeculum) {
            menuButtonSpeculum.addEventListener("click", () => {
                menuDropdownSpeculum.classList.toggle("active");
            });

            const backButtonSpeculum = document.createElement("button");
            backButtonSpeculum.innerHTML = "<";
            backButtonSpeculum.classList.add("back-button");
            backButtonSpeculum.style.cssText = `
              position: absolute;
              top: calc(1.8cm + 3cm);
              left: 20px;
              font-size: 30px;
              z-index: 1;
            `;

            speculumScreen.insertBefore(backButtonSpeculum, speculumScreen.firstChild);

            backButtonSpeculum.addEventListener("click", () => {
                speculumScreen.classList.remove("active");
                screenFive.classList.add("active");
            });
        }
    });

    // Final show screen
    finalShowButton.addEventListener("click", () => {
        screenFive.classList.remove("active");
        const finalShowScreen = document.getElementById("final-show-screen"); 
        finalShowScreen.classList.add("active");

        const menuButtonFinalShow = document.getElementById("menu-button-final-show");
        const menuDropdownFinalShow = document.getElementById("menu-dropdown-final-show");

        if (menuButtonFinalShow) {
            menuButtonFinalShow.addEventListener("click", () => {
                menuDropdownFinalShow.classList.toggle("active");
            });

            const backButtonFinalShow = document.createElement("button");
            backButtonFinalShow.innerHTML = "<";
            backButtonFinalShow.classList.add("back-button");
            backButtonFinalShow.style.cssText = `
              position: absolute;
              top: calc(1.8cm + 3cm);
              left: 20px;
              font-size: 30px;
              z-index: 1;
            `;

            finalShowScreen.insertBefore(backButtonFinalShow, finalShowScreen.firstChild);

            backButtonFinalShow.addEventListener("click", () => {
                finalShowScreen.classList.remove("active");
                screenFive.classList.add("active");
            });
        }
    });
});
