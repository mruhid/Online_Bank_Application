function submitCard() {
    var cardNumber = document.getElementById('cardNumber').value;

    // Basic check: 16 digits and spaces only. Note: This does not validate the card number!
    if (/^(\d{4} ){3}\d{4}$/.test(cardNumber)) {
        alert('Card number accepted (for this mockup)!');
    } else {
        alert('Please enter a valid card number (for this mockup).');
    }
}
function submitCard() {
    var cardNumber = document.getElementById('cardNumber').value;
    var submitButton = document.querySelector('button');

    // Basic check: 16 digits and spaces only.
    if (/^(\d{4} ){3}\d{4}$/.test(cardNumber)) {
        submitButton.textContent = 'Finding...';
        submitButton.classList.add('finding');

        // Simulate "finding card" for 2 seconds before showing a success message
        setTimeout(function() {
            submitButton.textContent = 'Submit';
            submitButton.classList.remove('finding');
            alert('Card number accepted (for this mockup)!');
        }, 2000);
    } else {
        alert('Please enter a valid card number (for this mockup).');
    }
}
