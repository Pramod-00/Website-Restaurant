// DOM Elements
const loginButton = document.getElementById("login-button");
const loginPopup = document.getElementById("login-popup");
const googleLoginPopup = document.getElementById("google-login-popup");

// Function to Show Login Popup
loginButton.addEventListener("click", () => {
    loginPopup.style.display = "flex";
});

// Function to Close Login Popup
function closeLoginPopup() {
    loginPopup.style.display = "none";
}

// Function to Close Google Login Popup
function closeGoogleLoginPopup() {
    googleLoginPopup.style.display = "none";
}
const userIcon = document.getElementById("user-icon");

// Handle Standard Login Form Submission
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "pramod" && password === "p123!") {
        // Add success animation and open the website
        loginPopup.style.opacity = 0; // Fade out login popup
        setTimeout(() => {
            loginPopup.style.display = "none";
            loginButton.style.display = "none"; // Hide login button
            userIcon.style.display = "block"; // Show user icon
        }, 500);
    } else {
        // Shake the form if login fails
        const form = document.getElementById("login-form");
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 500);
    }
});

// Handle Google Login Button
document.getElementById("google-login").addEventListener("click", () => {
    loginPopup.style.display = "none";
    googleLoginPopup.style.display = "flex";
});

// Handle Google Login Form Submission
document.getElementById("google-login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    if (email) {
        // Add success animation and open the website
        googleLoginPopup.style.opacity = 0; // Fade out Google login popup
        setTimeout(() => {
            googleLoginPopup.style.display = "none";
            loginButton.style.display = "none"; // Hide login button
            userIcon.style.display = "block"; // Show user icon
        }, 500);
    } else {
        // Shake the form if email is invalid
        const form = document.getElementById("google-login-form");
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 500);
    }
});
console.log("Login Button Hidden");
console.log("User Icon Shown");
const testIcon = document.createElement("div");
testIcon.id = "test-user-icon";
testIcon.style.width = "50px";
testIcon.style.height = "50px";
testIcon.style.background = "red"; // Debugging visual
testIcon.style.position = "absolute";
testIcon.style.top = "60px";
testIcon.style.left = "150px";

document.body.appendChild(testIcon);

userIcon.addEventListener("click", () => {
    // Toggle user menu visibility or handle logout
    alert("User Menu or Logout Functionality");
});

// Function to show a temporary notification
function showNotification(message) {
    // Create the notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    // Append to the body
    document.body.appendChild(notification);

    // Remove the notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Cart array to store selected items
const cart = [];

// Get necessary DOM elements
const cartModal = document.getElementById("cart-modal");
const cartItemsList = document.getElementById("cart-items");
const cartIcon = document.getElementById("cart-icon");
const closeCartButton = document.getElementById("close-cart");

// Open the cart modal
cartIcon.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
    updateCartDisplay();
});

// Close the cart modal
closeCartButton.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart-button").forEach(button => {
    button.addEventListener("click", event => {
        const dishElement = event.target.closest(".dish");
        const name = dishElement.getAttribute("data-name") || "Unknown Item"; // Default if name is missing
        const priceAttr = dishElement.getAttribute("data-price"); // Get price attribute
        const price = priceAttr ? parseFloat(priceAttr) : 0; // Parse price or use 0 if invalid
        
        if (isNaN(price)) {
            console.error(`Invalid price for item: ${name}`);
            showNotification(`Error: Invalid price for ${name}.`);
            return;
        }

        addToCart(name, price);
    });
});

// Add an item to the cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
    } else {
        cart.push({ name, price, quantity: 1 }); // Add new item to the cart
    }
    showNotification(`${name} added to the cart!`);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    let total = 0;

    cartItemsList.innerHTML = ""; // Clear previous display

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
        cartTotalDisplay.textContent = "Total: $0.00";
        return;
    }

    // Loop through the cart
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const listItem = document.createElement("li");
        listItem.classList.add("cart-item");
        listItem.innerHTML = `
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="item-controls">
                <button class="decrease" data-index="${index}">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase" data-index="${index}">+</button>
                <button class="remove" data-index="${index}">Remove</button>
            </div>
        `;
        cartItemsList.appendChild(listItem);
    });

    cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;

    // Add button functionality
    cartItemsList.querySelectorAll(".increase").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            updateCartDisplay();
        });
    });

    cartItemsList.querySelectorAll(".decrease").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                alert("Quantity cannot be less than 1.");
            }
            updateCartDisplay();
        });
    });

    cartItemsList.querySelectorAll(".remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1); // Remove the item from the cart
            updateCartDisplay();
        });
    });
}
