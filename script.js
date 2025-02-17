document.addEventListener("DOMContentLoaded", function () {
     // Get audio element  const backgroundMusic = document.getElementById("backgroundMusic");const toggleMusicButton = document.getElementById("toggleMusic");
    // Default state is music off let isMusicPlaying = false;

    // Toggle music play/pause when button is clicked
  /* toggleMusicButton.addEventListener("click", function () {
        if (isMusicPlaying) {
            backgroundMusic.pause(); // Pause music
            toggleMusicButton.textContent = "Turn Music On"; // Change button text
        } else {
            backgroundMusic.play(); // Play music
            toggleMusicButton.textContent = "Turn Music Off"; // Change button text
        }
        isMusicPlaying = !isMusicPlaying; // Toggle music state
    });*/
    
    document.getElementById("rsvpForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        let imePrezime = document.getElementById("ime_prezime").value.trim();
        let dolazak = document.querySelector('input[name="dolazak"]:checked');
        let brojOsoba = document.getElementById("broj_osoba").value.trim();
        let smjestaj = document.querySelector('input[name="smjestaj"]:checked');
        let dodatneNapomene = document.getElementById("dodatne_napomene").value.trim();

        // Validation check
        if (imePrezime === "" || !dolazak || brojOsoba === "" || !smjestaj) {
            alert("Molimo vas da popunite sva obavezna polja (ime, dolazak, broj osoba i smještaj).");
            return;
        }

        // Show immediate confirmation message
        let existingMessage = document.querySelector(".confirmation");
        if (existingMessage) {
            existingMessage.remove();
        }

        let message = document.createElement("p");
        message.classList.add("confirmation");
        message.textContent = "Hvala! Vaša prijava je zaprimljena.";
        message.style.color = "#2E8B57"; // Soft green color
        message.style.fontSize = "1.2em";
        message.style.marginTop = "15px";
        message.style.textAlign = "center";

        // Append the confirmation message
        document.getElementById("rsvp").appendChild(message);

        // Reset form after submission
        document.getElementById("rsvpForm").reset();

        // Keep the confirmation message visible for 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);

        // Prepare data object
        let formData = {
            ime_prezime: imePrezime,
            dolazak: dolazak.value,
            broj_osoba: brojOsoba,
            smjestaj: smjestaj.value,
            dodatne_napomene: dodatneNapomene // Added field
        };

        // Google Apps Script Web App URL (replace with your actual deployed URL)
        let scriptURL = "https://script.google.com/macros/s/AKfycbyRjwfZXXZEqu39PeC5rKFUUsui88K2P7hYPMp4C-IZiKLKOdYj-EGpNXyo17AEnS5c/exec";

        // Send data to Google Apps Script
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            // Optional: You can add success logic here if needed (but you're already showing confirmation)
            console.log("Form submitted successfully.");
        })
        .catch(error => {
            console.error("Greška prilikom slanja podataka!", error);
            alert("Došlo je do greške prilikom slanja podataka. Pokušajte ponovo.");
        });
    });
});
