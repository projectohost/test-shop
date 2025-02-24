let popupTimeout; // Store timeout reference

function showPopup(text, type = 'neutral', autoShowOnLoad = false) {
    let popup = document.getElementById('popup');
    let popupText = document.getElementById('popup-text');

    if (!popup || !popupText) {
        console.error("Popup element not found!");
        return;
    }

    // Remove existing type classes and 'hidden' class
    popup.classList.remove('success', 'wrong', 'neutral', 'fade-out', 'hidden');

    // Apply type class
    popup.classList.add(type);

    popupText.innerText = text;
    popup.classList.add('fade-in');

    // Clear existing timeout if already running
    clearTimeout(popupTimeout);

    // Hide after 2.5s
    popupTimeout = setTimeout(() => {
        popup.classList.remove('fade-in');
        popup.classList.add('fade-out');

        setTimeout(() => {
            popup.classList.add('hidden');
        }, 500);
    }, 2500);
}

// Function to close popup manually
function closePopup() {
    let popup = document.getElementById('popup');
    if (!popup) return;

    clearTimeout(popupTimeout); // Clear timeout when manually closing
    popup.classList.add('fade-out');

    setTimeout(() => {
        popup.classList.add('hidden');
    }, 500);
}

// Universal function to attach event listeners
function setupPopupTrigger(selector, message, type) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('click', () => showPopup(message, type));
    });
}

// Example: Show popup on page load
document.addEventListener('DOMContentLoaded', () => {
    showPopup("Welcome to AlpsDiscovery!", "neutral", false);
});

