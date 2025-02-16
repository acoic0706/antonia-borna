document.addEventListener("DOMContentLoaded", function () {
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
        .then(() => {
            // Remove old confirmation message if exists
            let existingMessage = document.querySelector(".confirmation");
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create new confirmation message
            let message = document.createElement("p");
            message.classList.add("confirmation");
            message.textContent = "✅ Hvala! Vaša prijava je zaprimljena. 😊";
            message.style.color = "#2E8B57"; // Soft green color
            message.style.fontSize = "1.2em";
            message.style.marginTop = "15px";
            message.style.textAlign = "center";

            // Append message to form
            document.getElementById("rsvp").appendChild(message);

            // Reset form after submission
            document.getElementById("rsvpForm").reset();

            // Keep message visible for 5 seconds
            setTimeout(() => {
                message.remove();
            }, 5000);
        })
        .catch(error => {
            console.error("Greška prilikom slanja podataka!", error);
            alert("Došlo je do greške prilikom slanja podataka. Pokušajte ponovo.");
        });
    });
});
