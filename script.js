 // ===================== ShopSync Script =====================

// DOM Ready Handler
document.addEventListener("DOMContentLoaded", () => {
    console.log("ShopSync Loaded!");

    // ================= Typing Animation =================
    const typingText = document.getElementById("typing-text");
    if (typingText) {
        let text = typingText.textContent;
        typingText.textContent = "";
        let index = 0;

        const typeChar = () => {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 70); // Typing speed
            }
        };

        typeChar();
    }

    // ================= Dark Mode Setup =================
    const toggleSwitch = document.getElementById("dark-mode-toggle");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // ================= Dark Mode Toggle =================
    toggleSwitch.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });

    // ================= Load Cart Count =================
    let cartCount = localStorage.getItem("cartCount") || 0;
    const cartCountElem = document.getElementById("cart-count");
    if (cartCountElem) {
        cartCountElem.textContent = cartCount;
    }

    // ================= Load Navbar Dynamically =================
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
            }
        })
        .catch(error => console.error("Error loading navbar:", error));

    // ================= Shop Owner Product Form Logic =================
    const form = document.getElementById("product-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("product-name").value;
            const price = document.getElementById("product-price").value;
            const description = document.getElementById("product-description").value;
            const image = document.getElementById("product-image").value;
            const stock = document.getElementById("product-stock").value;

            const product = { name, price, description, image, stock };
            const products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(product);
            localStorage.setItem("products", JSON.stringify(products));
            alert("Product added successfully!");
            form.reset();
        });
    }
});

// ================= Cart Logic (Outside DOMContentLoaded) =================

function addToCart() {
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    document.getElementById("cart-count").textContent = cartCount;
}

function removeFromCart() {
    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
    if (cartCount > 0) {
        cartCount--;
    }
    localStorage.setItem("cartCount", cartCount);
    document.getElementById("cart-count").textContent = cartCount;
}

function clearCart() {
    localStorage.setItem("cartCount", 0);
    document.getElementById("cart-count").textContent = 0;
}

window.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("admin-login");
  const userBtn = document.getElementById("user-login");

  if (adminBtn && userBtn) {
    adminBtn.addEventListener("click", function(e) {
      e.preventDefault();
      showGoogleSignIn("Admin");
    });

    userBtn.addEventListener("click", function(e) {
      e.preventDefault();
      showGoogleSignIn("User");
    });
  }

  function showGoogleSignIn(role) {
    google.accounts.id.initialize({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace this later
      callback: (response) => handleCredentialResponse(response, role)
    });

    google.accounts.id.prompt(); // show Google login popup
  }

  function handleCredentialResponse(response, role) {
    console.log("Google Login Success for:", role);
    console.log("Credential Response:", response);

    // Redirect based on role
    if (role === "Admin") {
      window.location.href = "shop_owner.html";
    } else {
      window.location.href = "shop_products.html";
    }
  }
});
// login with google code js
window.addEventListener("DOMContentLoaded", () => {
    const adminBtn = document.getElementById("admin-login");
    const userBtn = document.getElementById("user-login");
  
    if (adminBtn && userBtn) {
      adminBtn.addEventListener("click", function(e) {
        e.preventDefault();
        showGoogleSignIn("Admin");
      });
  
      userBtn.addEventListener("click", function(e) {
        e.preventDefault();
        showGoogleSignIn("User");
      });
    }
  
    function showGoogleSignIn(role) {
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace this later
        callback: (response) => handleCredentialResponse(response, role)
      });
  
      google.accounts.id.prompt(); // show Google login popup
    }
  
    function handleCredentialResponse(response, role) {
      console.log("Google Login Success for:", role);
      console.log("Credential Response:", response);
  
      // Redirect based on role
      if (role === "Admin") {
        window.location.href = "shop_owner.html";
      } else {
        window.location.href = "shop_products.html";
      }
    }
  });
  