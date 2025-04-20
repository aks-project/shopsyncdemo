  // ===================== ShopSync Script =====================

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
              setTimeout(typeChar, 70);
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
      localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  });

  // ================= Load Cart Count =================
  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
      let cartCount = localStorage.getItem("cartCount") || 0;
      cartCountElem.textContent = cartCount;
  }

  // ================= Load Navbar Dynamically =================
  fetch("navbar.html")
      .then(response => response.text())
      .then(data => {
          const navbarContainer = document.getElementById("navbar-container");
          if (navbarContainer) navbarContainer.innerHTML = data;
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

  // ================= Google Login Buttons =================
  const adminBtn = document.getElementById("admin-login");
  const userBtn = document.getElementById("user-login");
  const googleLoginDiv = document.getElementById("google-login");
  let userRole = "";

  if (adminBtn && userBtn) {
      adminBtn.addEventListener("click", function(e) {
          e.preventDefault();
          userRole = "Admin";
          showGoogleSignInButton();
      });

      userBtn.addEventListener("click", function(e) {
          e.preventDefault();
          userRole = "User";
          showGoogleSignInButton();
      });
  }

  function showGoogleSignInButton() {
      googleLoginDiv.style.display = "block";
      google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID",
          callback: (response) => handleCredentialResponse(response, userRole)
      });
      google.accounts.id.renderButton(googleLoginDiv, {
          theme: "outline",
          size: "large",
          shape: "pill"
      });
  }

  function handleCredentialResponse(response, role) {
      console.log("Logged in as:", role);
      console.log("Credential:", response);
      if (role === "Admin") {
          window.location.href = "shop_owner.html";
      } else {
          window.location.href = "shop_products.html";
      }
  }

  // ================= FAQ Toggle Logic =================
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
      question.addEventListener("click", () => {
          const answer = question.nextElementSibling;
          if (answer.style.display === "block") {
              answer.style.display = "none";
          } else {
              answer.style.display = "block";
          }
      });
  });
});

// ================= Cart Logic =================
function addToCart() {
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  cartCount++;
  localStorage.setItem("cartCount", cartCount);
  document.getElementById("cart-count").textContent = cartCount;
}

function removeFromCart() {
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
  if (cartCount > 0) cartCount--;
  localStorage.setItem("cartCount", cartCount);
  document.getElementById("cart-count").textContent = cartCount;
}

function clearCart() {
  localStorage.setItem("cartCount", 0);
  document.getElementById("cart-count").textContent = 0;
}
