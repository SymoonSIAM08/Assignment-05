let accountBalance = 5500;
const balanceElement = document.getElementById('balance');
balanceElement.textContent = `${accountBalance} BDT`;

const donationCards = [
    {
        title: "Donate for Flood at Noakhali, Bangladesh",
        donatedAmount: 0
    }
    // Add more donation card objects as needed
];

// Update donation amount displayed on card
function updateDonationCard(index) {
    document.querySelector(`#donationSection div:nth-child(${index + 1}) .block`).textContent = `${donationCards[index].donatedAmount} BDT`;
}

// Handle donation functionality
function handleDonation(cardIndex) {
    const donationInput = document.querySelector(`#donationInput-${cardIndex}`);
    const donationAmount = parseFloat(donationInput.value);
    
    if (isNaN(donationAmount) || donationAmount <= 0 || donationAmount > accountBalance) {
        alert('Invalid donation amount. Please enter a valid number.');
        return;
    }

    accountBalance -= donationAmount;
    balanceElement.textContent = `${accountBalance} BDT`;

    donationCards[cardIndex].donatedAmount += donationAmount;
    updateDonationCard(cardIndex);

    const currentDonationTitle = donationCards[cardIndex].title;
    const historyEntry = {
        amount: donationAmount,
        title: currentDonationTitle,
        date: new Date().toISOString()
    };

    let donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];
    donationHistory.push(historyEntry);
    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));

    donationInput.value = '';
    alert(`You have successfully donated ${donationAmount} BDT for ${currentDonationTitle}`);
}

// Toggle between donation and history views
document.getElementById('donationTab').addEventListener('click', () => {
    document.getElementById('donationSection').classList.remove('hidden');
    document.getElementById('historySection').classList.add('hidden');
});

document.getElementById('historyTab').addEventListener('click', () => {
    document.getElementById('donationSection').classList.add('hidden');
    document.getElementById('historySection').classList.remove('hidden');

    // Fetch the latest history data from localStorage
    const donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    donationHistory.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('bg-white', 'p-4', 'rounded', 'shadow-sm', 'border');
        historyItem.innerHTML = `
            <h3 class="font-semibold">${entry.amount} BDT Donated for ${entry.title}</h3>
            <p class="text-gray-500 text-sm">Date: ${new Date(entry.date).toLocaleString()}</p>
        `;
        historyContainer.appendChild(historyItem);
    });
});
