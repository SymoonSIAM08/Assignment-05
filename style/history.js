document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("historyList");
    
    // Load donation history from local storage
    const donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];

    // Function to display donation history
    function displayHistory() {
        // Clear existing history
        historyList.innerHTML = '';

        // Loop through donation history and create elements
        donationHistory.forEach(donation => {
            const donationItem = document.createElement("div");
            donationItem.className = "card bg-base-100 shadow-xl p-5";
            donationItem.innerHTML = `
                <h2 class="font-bold">${donation.amount} BDT donated for ${donation.cardName}</h2>
                <p>Date: ${donation.date}</p>
            `;
            historyList.appendChild(donationItem);
        });
    }

    // Call the display function to show history on page load
    displayHistory();
});
