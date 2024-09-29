// Sample data structure to hold donation history
let donationHistory = [];

// Function to update the history display
function updateHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = ''; // Clear previous entries

    // Populate the history section with donations
    donationHistory.forEach(donation => {
        const donationEntry = document.createElement("div");
        donationEntry.className = "p-4 bg-white shadow-md rounded-lg";
        donationEntry.innerHTML = `
            <h3 class="font-bold">${donation.amount} BDT donated for ${donation.cardName}</h3>
            <p>Date: ${donation.date}</p>
        `;
        historyList.appendChild(donationEntry);
    });
}

// Function to simulate adding a donation (this would normally be triggered by the donation process)
function addDonation(amount, cardName) {
    const date = new Date().toLocaleString();
    donationHistory.push({ amount, cardName, date });
    updateHistory();
}

// Example usage - Uncomment the line below to simulate donations
// addDonation(10000, "Flood Relief in Noakhali");
// addDonation(5000, "Aid for Injured in the Quota Movement");

// Initial population of history (for demo purposes)
addDonation(10000, "Flood Relief in Noakhali");
addDonation(5000, "Aid for Injured in the Quota Movement");
