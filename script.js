document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("rsvpForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let dolazak = document.getElementById("dolazak").value;
        let brojOsoba = document.getElementById("broj_osoba").value;

        // Prepare data object
        let formData = {
            ime: ime,
            prezime: prezime,
            dolazak: dolazak,
            broj_osoba: brojOsoba
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
            alert("Podaci su poslani! Hvala na potvrdi.");
            document.getElementById("rsvpForm").reset(); // Reset form after submission
        })
        .catch(error => console.error("Greška prilikom slanja podataka!", error));
    });
});

