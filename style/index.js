




// On page load, retrieve the balance from localStorage
document.addEventListener("DOMContentLoaded", function () {
    let balance = parseFloat(localStorage.getItem("balance")) || 10000;
    document.getElementById("balanceDisplay").textContent = balance;

    // Add event listener to close the modal
    document.getElementById("closeModal").addEventListener("click", closeModal);
});

// Function to handle the donation
function donate(amount, donationType) {
    let balance = parseFloat(localStorage.getItem("balance")) || 10000;

    if (amount > 0 && amount <= balance) {
        // Deduct the amount from the balance
        balance -= amount;
        localStorage.setItem("balance", balance);
        document.getElementById("balanceDisplay").textContent = balance;

        // Show the modal after a successful donation
        showModal("Thank you for your contribution!");

        // Update received amount in the donation card
        const receivedElement = document.getElementById(`received${donationType}`);
        let currentReceived = parseFloat(receivedElement.textContent) || 0;
        receivedElement.textContent = currentReceived + amount;

        // Clear the input field
        clearInputFields(donationType);

        // Store donation history in localStorage
        saveDonationHistory(amount, donationType);

    } else {
        alert("Invalid amount. Please enter a valid donation amount within your available balance.");
    }
}

// Function to show the donation modal
function showModal(message) {
    const modal = document.getElementById("donationModal");
    modal.classList.add("modal-open");
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("donationModal");
    modal.classList.remove("modal-open");
}

// Function to clear input fields after successful donation
function clearInputFields(donationType) {
    document.getElementById(`donationAmount${donationType}`).value = '';
}

// Function to handle donation and redirect to history page
function donateAndRedirect(donationType) {
    const donationAmount = parseFloat(document.getElementById(`donationAmount${donationType}`).value);
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }
    donate(donationAmount, donationType);
}

// Function to save donation history to localStorage
function saveDonationHistory(amount, donationType) {
    // Retrieve existing donation history or initialize a new array if not available
    let donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];

    // Create a new entry for the donation
    const newDonation = {
        cardName: donationType, // Replace with the actual donation card name if available
        amount: amount,
        date: new Date().toISOString()
    };

    // Add the new donation entry to the history array
    donationHistory.push(newDonation);

    // Store the updated history back in localStorage
    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));
}
