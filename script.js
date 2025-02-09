document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rsvpForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        let imePrezime = document.getElementById("ime_prezime").value;
        let dolazak = document.querySelector('input[name="dolazak"]:checked');
        let brojOsoba = document.getElementById("broj_osoba").value;
        let smjestaj = document.querySelector('input[name="smjestaj"]:checked');

        // Ensure radio buttons are selected
        if (!dolazak || !smjestaj) {
            alert("Molimo vas da odaberete dolazak i smještaj.");
            return;
        }

        // Prepare data object
        let formData = {
            ime_prezime: imePrezime,
            dolazak: dolazak.value,
            broj_osoba: brojOsoba,
            smjestaj: smjestaj.value
        };

        // Google Apps Script Web App URL (replace with your actual deployed URL)
        let scriptURL = "https://script.google.com/macros/s/AKfycbxfHeHiZqjty8Zrut3mt24ZMwzF-QKbZBhQ3BPwkPKKZZOmP3hENKh66GDcJu3_GNZlSw/exec";

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

            // Append message to form
            document.getElementById("rsvp").appendChild(message);

            // Reset form after submission
            document.getElementById("rsvpForm").reset();

            // Keep message visible for longer (5 seconds)
            setTimeout(() => {
                message.remove();
            }, 5000);
        })
        .catch(error => {
            console.error("Greška prilikom slanja podataka!", error);
        });
    });
});
