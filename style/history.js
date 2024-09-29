// // On page load, retrieve the balance and donation history from localStorage
// document.addEventListener("DOMContentLoaded", function () {
//     let balance = parseFloat(localStorage.getItem("balance")) || 10000;
//     document.getElementById("balanceDisplay").textContent = balance;

//     // Retrieve and display donation history
//     displayDonationHistory();
// });

// // Function to display donation history
// function displayDonationHistory() {
//     const historyList = document.getElementById("historyList");
//     const donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];

//     if (donationHistory.length === 0) {
//         historyList.innerHTML = "<p>No donation history available.</p>";
//         return;
//     }

//     donationHistory.forEach(entry => {
//         const historyItem = document.createElement("div");
//         historyItem.classList.add("bg-white", "p-4", "rounded", "shadow", "border");

//         historyItem.innerHTML = `
//             <h3 class="font-semibold">${entry.amount} BDT Donated for ${entry.title}</h3>
//             <p class="text-gray-500 text-sm">Date: ${new Date(entry.date).toLocaleString()}</p>
//         `;

//         historyList.appendChild(historyItem);
//     });
// }





function displayDonationHistory() {
    const historyList = document.getElementById("historyList");
    const donationHistory = JSON.parse(localStorage.getItem("donationHistory")) || [];

    // Clear previous history content
    historyList.innerHTML = "";

    if (donationHistory.length === 0) {
        historyList.innerHTML = "<p>No donation history available.</p>";
        return;
    }

    donationHistory.forEach(entry => {
        const historyItem = document.createElement("div");
        historyItem.classList.add("bg-white", "p-4", "rounded", "shadow", "border");

        // Make sure entry.title exists and is displayed
        historyItem.innerHTML = `
            <h3 class="font-semibold">${entry.amount} BDT Donated for ${entry.title || "Unknown"}</h3>
            <p class="text-gray-500 text-sm">Date: ${new Date(entry.date).toLocaleString()}</p>
        `;

        historyList.appendChild(historyItem);
    });
}
