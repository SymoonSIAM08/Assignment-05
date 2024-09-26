

// Account balance initialization
let accountBalance = 5500;
document.getElementById('account-balance').querySelector('span').innerText = `${accountBalance} BDT`;

// Show and hide modal
const donationModal = document.getElementById('donation-modal');
const closeModalBtn = document.getElementById('close-modal');
function showModal() {
    donationModal.classList.remove('hidden');
}
function hideModal() {
    donationModal.classList.add('hidden');
}
closeModalBtn.addEventListener('click', hideModal);

// Handle donation button clicks
document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const cardId = e.currentTarget.getAttribute('data-card');
        const inputField = document.getElementById(`donation-input-${cardId}`);
        const donationAmount = parseInt(inputField.value);
        if (validateDonation(donationAmount)) {
            updateBalance(donationAmount);
            updateDonationAmount(cardId, donationAmount);
            addHistoryEntry(cardId, donationAmount);
            inputField.value = ''; // Clear input field
            showModal();
        }
    });
});

// Validate donation input
function validateDonation(amount) {
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid donation amount.");
        return false;
    }
    if (amount > accountBalance) {
        alert("Insufficient funds.");
        return false;
    }
    return true;
}

// Update account balance
function updateBalance(amount) {
    accountBalance -= amount;
    document.getElementById('account-balance').querySelector('span').innerText = `${accountBalance} BDT`;
}

// Update the current donation amount for the card
function updateDonationAmount(cardId, amount) {
    const currentDonationElement = document.getElementById(`current-donation-${cardId}`);
    let currentDonation = parseInt(currentDonationElement.innerText.replace('Current Donation: ', '').replace(' BDT', ''));
    currentDonation += amount;
    currentDonationElement.innerText = `Current Donation: ${currentDonation} BDT`;
}

// Add entry to the history section
function addHistoryEntry(cardId, amount) {
    const historyList = document.getElementById('history-list');
    const date = new Date().toLocaleString();
    const newItem = document.createElement('li');
    newItem.innerText = `Donated ${amount} BDT for cause ${cardId} on ${date}`;
    historyList.appendChild(newItem);
    document.getElementById('history-section').classList.remove('hidden');
}

// Toggle tabs
const donationTab = document.getElementById('donation-tab');
const historyTab = document.getElementById('history-tab');
const donationSection = document.querySelector('.grid');
const historySection = document.getElementById('history-section');

donationTab.addEventListener('click', () => {
    donationTab.classList.add('tab-active');
    historyTab.classList.remove('tab-active');
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
});

historyTab.addEventListener('click', () => {
    historyTab.classList.add('tab-active');
    donationTab.classList.remove('tab-active');
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
});
