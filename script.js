document.addEventListener("DOMContentLoaded", function () {
    console.log("ShopSync Loaded!");
});
// Dark Mode Toggle Function
const toggleSwitch = document.getElementById("dark-mode-toggle");

toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");

    // Store user preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Apply saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }
});

//cart icon logic start from here
document.addEventListener("DOMContentLoaded", function () {
    let cartCount = localStorage.getItem("cartCount") || 0;
    document.getElementById("cart-count").textContent = cartCount;
});

// Function to add an item to the cart
function addToCart() {
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    document.getElementById("cart-count").textContent = cartCount;
}

// Function to remove an item from the cart
function removeFromCart() {
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    if (cartCount > 0) {
        cartCount--;
    }
    localStorage.setItem("cartCount", cartCount);
    document.getElementById("cart-count").textContent = cartCount;
}

// Function to clear the cart
function clearCart() {
    localStorage.setItem("cartCount", 0);
    document.getElementById("cart-count").textContent = 0;
}
 
 // Load the navbar dynamically
document.addEventListener("DOMContentLoaded", function () {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});

