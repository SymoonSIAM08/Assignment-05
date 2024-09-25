document.addEventListener('DOMContentLoaded', () => {
    // Get all "Donate Now" buttons
    const donateButtons = document.querySelectorAll('.btn-success');
  
    // Get the modal and close button elements
    const modal = document.getElementById('donation-modal');
    const closeModalBtn = document.getElementById('close-modal');
  
    // Show modal when "Donate Now" button is clicked
    donateButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.classList.remove('hidden'); // Display the modal
      });
    });
  
    // Hide modal when "Close" button is clicked
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden'); // Hide the modal
    });
  });
  