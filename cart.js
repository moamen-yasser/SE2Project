

const openbtn=document.getElementById("open_cart_btn");
const cart =document.getElementById("sidecart");
const closebtn=document.getElementById("close_btn");
const backdrop=document.querySelector(".backdrop");
const cartitems=document.querySelector(".cart_items");
const itemnum=document.getElementById("items_num");
const subtotalprice=document.getElementById("subtotal_price");

let cart_data = JSON.parse(localStorage.getItem('cart_data')) || [];

openbtn.addEventListener("click",opencart);
closebtn.addEventListener("click",closecart);
backdrop.addEventListener("click",closecart);

rendercartitems();

// Open cart
function opencart() {
    cart.classList.add("open");
    backdrop.style.display = "block";
    setTimeout(() => {
        backdrop.classList.add("show");
    }, 0);
}

// Close cart
function closecart() {
    cart.classList.remove("open");
    backdrop.style.display = "none";
    setTimeout(() => {
        backdrop.classList.remove("show");
    }, 500);
}

// Add items to cart
function additem(item) {
    // Ensure a unique identifier is checked (e.g., id)
    const foundeditem = cart_data.find((cartItem) => cartItem.id === item.id);
    if (foundeditem) {
        // If the item already exists in the cart, increase its quantity
        foundeditem.qty += 1;
    } else {
        // Add the new item to the cart with quantity 1
        cart_data.push({ ...item, qty: 1 });
    }
    // Update and open the cart after changes
    updatecart();
    opencart();
}


// Remove item from cart
function removecartitem(itemId) {
    cart_data = cart_data.filter((item) => item.id !== itemId);
    updatecart();
}

// Increase quantity
function increaseqty(itemId) {
    cart_data = cart_data.map((item) => 
        item.id === itemId ? { ...item, qty: item.qty + 1 } : item
    );
    updatecart();
}

// Decrease quantity
function decreaseqty(itemId) {
    cart_data = cart_data.map((item) => 
        item.id === itemId ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty } : item
    );
    updatecart();
}

// Calculate items number
function calcitemsnum() {
    let itemscount = 0;
    cart_data.forEach(item => itemscount += item.qty);
    itemnum.innerText = itemscount;
}

// Calculate subtotal price
function calcsubtotalprice() {
    let subtotal = 0;
    cart_data.forEach((item) => subtotal += item.price * item.qty);
    subtotalprice.innerText = subtotal;
}

//render items 

function renderItemsShop(jsonFilePath) {
    const container = document.getElementById('shopSec');
// Fetch product data from a JSON file
    fetch(jsonFilePath)  // Assuming 'products.json' is in the same directory
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load the JSON file');
        }
        return response.json();
    }).then(items => {

        container.innerHTML = '';
        // Render the products dynamically
        items.forEach(product => {
            const block = document.createElement('div');
            block.classList.add('block', 'col-lg-4', 'col-md-6', 'col-sm-12');

            // Construct HTML for each product block
            block.innerHTML = `
                <div class="image">
                    <a href="productdetails.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <a href="#" id="block${product.id}">
                        <i class="${product.icon}"></i>
                    </a>
                </div>
                <div class="line1">
                    <p>${product.name}</p>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
                <div class="line2">
                    <p>${product.price}EGP</p>
                    <i class="fa-regular fa-heart" onclick="red(this)"></i>
                </div>
            `;

            // Attach an event listener to the "Add to Cart" button
            const addToCartButton = block.querySelector(`#block${product.id}`);
            addToCartButton.addEventListener("click", (e) => {
                // Check if user information exists in local storage
                const userName = localStorage.getItem('Name');
                const userEmail = localStorage.getItem('Email');
                const userPassword = localStorage.getItem('Password');

                if (!userName || !userEmail || !userPassword) {
                // Prevent adding to cart and show a message
                    swal({
                        title: "Sign Up Required!",
                        text: "Please sign up to add products to your cart.",
                        icon: "warning",
                        button: "Sign Up"
                    }).then((value) => {
                        if (value) {
                            // Redirect to signup.html when the button is clicked
                            window.location.href = 'signup.html';
                        }
                    });
                    return;
                }
                e.stopPropagation(); // Prevent parent event propagation
                additem(product); // Call your cart handling function
            });

            // Append the block to the container
            container.appendChild(block);
        });
    })
    .catch(error => {
        console.error("Error fetching product data:", error);
    });
}
renderItemsShop('shop.json');


function renderItemsCustomiz(jsonFilePath) {
    const itemsCustomize =  document.querySelector(".seec2");

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${jsonFilePath}`);
            }
            return response.json(); // Parse the JSON file
        })
        .then(items => {
            // Clear existing content (if re-rendering is needed)
            itemsCustomize.innerHTML = '';

            // Loop through the items to create and render each one
            items.forEach(item => {
                const itemEl = document.createElement("div");
                itemEl.classList.add("block", "container", "row", "col-lg-4", "col-md-6", "col-sm-12");

                // Set the HTML structure for each item
                itemEl.innerHTML = `
                    <div class="imagee">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="line">
                        <div class="left">
                            <h3>${item.price} EGP</h3>
                            <p>${item.name}</p>
                        </div>
                    </div>
                    <button class="btttn" id="add-to-cart-${item.id}">
                        Add to cart <a href="#"><i class="fa-solid fa-bag-shopping"></i></a>
                    </button>
                `;

                // Attach an event listener to the "Add to Cart" button
                const addToCartButton = itemEl.querySelector(`#add-to-cart-${item.id}`);
                addToCartButton.addEventListener("click", (e) => {
                    // Check if user information exists in local storage
                    const userName = localStorage.getItem('Name');
                    const userEmail = localStorage.getItem('Email');
                    const userPassword = localStorage.getItem('Password');

                    if (!userName || !userEmail || !userPassword) {
                    // Prevent adding to cart and show a message
                        swal({
                            title: "Sign Up Required!",
                            text: "Please sign up to add products to your cart.",
                            icon: "warning",
                            button: "Sign Up"
                        }).then((value) => {
                            if (value) {
                                // Redirect to signup.html when the button is clicked
                                window.location.href = 'signup.html';
                            }
                        });
                        return;
                    }
                    e.stopPropagation(); // Prevent parent event propagation
                    additem(item); // Call your cart handling function
                });

                // Append the item to the container
                itemsCustomize.appendChild(itemEl);
            });
        })
        .catch(error => {
            console.error(`Error loading items from ${jsonFilePath}:`, error);
        });
}

// Call the function with the JSON file path
renderItemsCustomiz('customiz.json');

// Function to render items from a JSON file
function renderItemsHome(jsonFilePath) {
    const itemsHome = document.querySelector(".seec5");

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load the JSON file');
            }
            return response.json();
        })
        .then(items => {
            // Clear any existing content in the container
            itemsHome.innerHTML = '';

            // Render items using a loop
            items.forEach(item => {
                const itemsEL = document.createElement("div");
                itemsEL.classList.add("block1");

                itemsEL.innerHTML = `
                    <div class="image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="top">
                        <h1>The Day With <span>${item.price} EGP</span></h1>
                        <p>${item.name}</p>
                    </div>
                    <div class="icons">
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <i class="fa-regular fa-heart" onclick="red(this)"></i>
                    </div>
                    <div class="text">
                        <h2>Product information</h2>
                        <p>This is a bouquet that proudly expresses its femininity. Calming blush tones, garden, and delicate floribundas roses bringing all their beauty.</p>
                        <button id="add-to-cart-${item.id}">Add to cart <a href="#"><i class="fa-solid fa-bag-shopping"></i></a></button>
                    </div>
                `;

                // Add event listener to the "Add to Cart" button
                const addToCartButton = itemsEL.querySelector(`#add-to-cart-${item.id}`);
                addToCartButton.addEventListener("click", (e) => {
                    // Check if user information exists in local storage
                    const userName = localStorage.getItem('Name');
                    const userEmail = localStorage.getItem('Email');
                    const userPassword = localStorage.getItem('Password');

                    if (!userName || !userEmail || !userPassword) {
                    // Prevent adding to cart and show a message
                        swal({
                            title: "Sign Up Required!",
                            text: "Please sign up to add products to your cart.",
                            icon: "warning",
                            button: "Sign Up"
                        }).then((value) => {
                            if (value) {
                                // Redirect to signup.html when the button is clicked
                                window.location.href = 'signup.html';
                            }
                        });
                        return;
                    }
                    e.stopPropagation(); // Prevent parent element events
                    additem(item); // Call additem function from cart.js
                });

                // Append the item element to the container
                itemsHome.appendChild(itemsEL);
            });
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}

// Call the function with the JSON file path
renderItemsHome('home.json');

// display / render cart items
function rendercartitems(){
    // remove everything  from cart
    cartitems.innerHTML="";
    //add new data
    cart_data.forEach(item =>{
        const cartitem = document.createElement('div');
        cartitem.classList.add('cart_item');
        cartitem.innerHTML=`
                    <div class="remove_item" onclick="removecartitem(${item.id})">
                        <span>&times;</span>
                    </div>
                    <div class="item_img">
                        <img src="${item.image}">
                    </div>
                    <div class="item_details">
                        <p>${item.name}</p>
                        <strong>${item.price}EGP</strong>
                        <div class="qty">
                            <span onclick="decreaseqty(${item.id})">-</span>
                            <strong>${item.qty}</strong>
                            <span onclick="increaseqty(${item.id})">+</span>
                        </div>
                    </div>
                `
        cartitems.appendChild(cartitem);
    })
}

// Update cart and store data in localStorage
function updatecart() {
    // Render cart items with updated data
    rendercartitems();
    
    // Update items number in cart
    calcitemsnum();
    
    // Update subtotal price in cart
    calcsubtotalprice();
    
    // Store cart data in localStorage
    localStorage.setItem('cart_data', JSON.stringify(cart_data));
}

// Load cart data from localStorage (when the page loads or refreshes)
function loadCartFromLocalStorage() {
    const savedCartData = localStorage.getItem('cart_data');
    if (savedCartData) {
        cart_data = JSON.parse(savedCartData);
        updatecart();  // Update the cart display with the loaded data
    }
}

// Call this function to load the cart when the page loads
loadCartFromLocalStorage();



// Handle Add to Cart logic
function handleAddToCart(e, product) {
    // Prevent event propagation (if needed)
    e.stopPropagation();

    // Get user information from localStorage
    const userName = localStorage.getItem('Name');
    const userEmail = localStorage.getItem('Email');
    const userPassword = localStorage.getItem('Password');

    // Check if the user is logged in
    if (!userName || !userEmail || !userPassword) {
        // Prevent adding to cart and show a warning message
        swal({
            title: "Sign Up Required!",
            text: "Please sign up to add products to your cart.",
            icon: "warning",
            button: "Sign Up"
        }).then((value) => {
            if (value) {
                // Redirect to signup page
                window.location.href = 'signup.html';
            }
        });
        return; // Stop further execution of the add to cart logic
    }

    // Proceed to add the product to the cart
    additem(product);
}