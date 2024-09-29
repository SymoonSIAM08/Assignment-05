


// On page load, retrieve the balance and donation history from localStorage
document.addEventListener("DOMContentLoaded", function () {
    let balance = parseFloat(localStorage.getItem("balance")) || 10000;
    document.getElementById("balanceDisplay").textContent = balance;

    // Retrieve and display donation history
    displayDonationHistory();
});

// Function to display donation history
function displayDonationHistory() {
    const historyList = document.getElementById("historyList");
    const donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];

    // Clear any previous donation history
    historyList.innerHTML = "";

    if (donationHistory.length === 0) {
        historyList.innerHTML = "<p>No donation history available.</p>";
        return;
    }

    donationHistory.forEach(entry => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("bg-white", "p-4", "rounded", "shadow", "border");

        // Display donation details with fallback for missing title
        historyItem.innerHTML = `
             <h3 class="font-semibold">${entry.amount} BDT Donated for ${entry.title || "mankind"}</h3>

            <p class="text-gray-500 text-sm">Date: ${new Date(entry.date).toLocaleString()}</p>
        `;

        historyList.appendChild(historyItem);
    });
}


// Function to add a new donation
function addDonation(amount,title ) {
    let donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];

    // Create a new donation entry
    const newDonation = {
        amount: amount,
        title: title,  
        date: new Date().toISOString()  
    };

    donationHistory.push(newDonation);

    // Update the donation history in localStorage
    localStorage.setItem("donationHistory", JSON.stringify(donationHistory));

    // Update the balance and display the history
    updateBalance(amount);
    displayDonationHistory();
}

// Function to update the balance after a donation
function updateBalance(amount) {
    let balance = parseFloat(localStorage.getItem("balance")) || 10000;
    balance -= amount;
    localStorage.setItem("balance", balance);
    document.getElementById("balanceDisplay").textContent = balance;
}

// Event listener for the donate button
document.getElementById("donateButton").addEventListener("click", function() {
    const amount = parseFloat(document.getElementById("amount").value);
    const title = document.getElementById("title").value;  // Get the title from the input field

    // Ensure both amount and title are provided
    if (!amount || !title) {
        alert("Please enter both an amount and a title.");
        return;
    }

    // Add the donation and update the display
    addDonation(amount, title);

    // Clear the input fields after submission
    document.getElementById("amount").value = "";
    document.getElementById("title").value = "";
});
