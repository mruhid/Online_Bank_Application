function sendMoney() {
    var amount = document.getElementById('amount').value;
    if (amount && amount > 0) {
        alert(`You are attempting to send $${amount}. Please confirm with your bank.`);
    } else {
        alert('Please enter a valid amount to send.');
    }
}
function sendMoney() {
    var amountInput = document.getElementById('amount');
    var amount = amountInput.value;
    if (amount && amount > 0) {
        alert(`You are attempting to send $${amount}. Please confirm with your bank.`);
    } else {
        // Add the shake animation to the input
        amountInput.classList.add('error-shake');
        
        // Remove the shake animation class after it finishes
        setTimeout(function() {
            amountInput.classList.remove('error-shake');
        }, 600);

        alert('Please enter a valid amount to send.');
    }
}
