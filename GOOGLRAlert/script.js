document.addEventListener('DOMContentLoaded', function() {
    const securityForm = document.querySelector('.security-form');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const countryCodeSelect = document.getElementById('countryCode');
    const container = document.querySelector('.container'); // Selectăm containerul principal

    securityForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Oprește trimiterea reală a formularului și reîncărcarea paginii

        const countryCode = countryCodeSelect.value;
        const phoneNumber = phoneNumberInput.value.trim(); // .trim() elimină spațiile albe de la început/sfârșit

        if (phoneNumber) {
            const fullPhoneNumber = countryCode + phoneNumber;
            const dataToSave = `Număr de telefon: ${fullPhoneNumber}\n`;

            // Crearea unui obiect Blob (Binary Large Object) cu datele
            const blob = new Blob([dataToSave], { type: 'text/plain;charset=utf-8' });

            // Crearea unui link temporar pentru descărcare
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'numere_salvate.txt'; // Numele fișierului care va fi descărcat

            // Simulează un click pe link pentru a iniția descărcarea
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink); // Elimină link-ul după descărcare

            // Afișează mesajul "Cont Protejat" și ascunde formularul
            container.innerHTML = `
                <div class="success-message-wrapper">
                    <img src="descărcare.png" alt="Imagine Succes" class="custom-success-image">
                    <h2 class="success-title">Cont Protejat</h2>
                    <p class="success-text">Numărul de telefon a fost înregistrat cu succes. Mulțumim pentru cooperare.</p>
                </div>
            `;
        } else {
            // Dacă numărul de telefon este gol
            alert('Vă rugăm să introduceți un număr de telefon valid.');
            // Alternativ, poți afișa un mesaj de eroare într-un element <p> sub input
            // Ex: document.getElementById('errorMessage').textContent = "Acest câmp este obligatoriu.";
        }
    });
});