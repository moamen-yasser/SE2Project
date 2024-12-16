///////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () =>{
    //funcctions for filter secarch 
    const searchinput=document.getElementById("search-input");
        const searchsuggestions=document.getElementById("search-suggestions");
    
        const suggestionsdata=[
        "Is The Perfect Way To Show Your Love",
        "Flowers always make people better"," happier and more helpful","They are sunshine, food and medicine to the soul.",
        "Perfect For your beloved","Voila Forest Cake With Roses Hand","Emma Remal Scarf With White Roses Bouquet",
        "Summer Vibes With Orange Roses","Light Pink Bouquet White Wrap","Al-Moled Bouquet With Purple and White roses",
        "Get Well Soon With Colorful Bouquet","Key L'azurde With White Roses","Felizmoda silver Bracelet With Pink Roses Bouquet",
        "Now you can customize your bouquet","Through the following three steps, you can create your own unique bouquet",
        "Decoration","White Kosha","pink Kosha","Discover Our Chocolate Bouquet Delights","Send a with Video Message with Your Flowers by QR Code",
        "Wedding Flowers Add a Touch of Elegance","We Use Eco-Friendly Flower Paper",
        "Fresh Flowers Delivered in Air-Conditioned Cars","Add a Personal Touch to Your Bouquet"
        ]
    
        function updatesuggestions(query){
        searchsuggestions.innerHTML="";
    
        const filtersuggestions=suggestionsdata.filter((item) =>
            item.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
    
        filtersuggestions.forEach((suggestion) => {
            const li =document.createElement('li');
            li.textContent=suggestion;
            li.addEventListener('click', () => {
            setsearchinputvalue(suggestion);
            window.location.href='shop.html';
            hidesuggestions();
            });
            searchsuggestions.appendChild(li);
        });
    
        togglesuggestions(filtersuggestions.length > 0);
        }
    
        function setsearchinputvalue(value){
        searchinput.value=value;
        }
    
        function hidesuggestions(show){
        searchsuggestions.style.display= show ? 'block' :'none';
        }
    
        searchinput.addEventListener('input', () =>{
        const query =searchinput.value;
        updatesuggestions(query);
        });
    
        document.addEventListener('click' ,(event) => {
        if (
            !searchsuggestions.contains(event.target) && 
            event.target !== searchinput
        )
        {
            hidesuggestions();
        }
        });
    
        searchinput.addEventListener("keydown" ,(event) =>{
        if(event.key === "Enter"){
            event.preventDefault();
        }
        });
    
        
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const itemsEl = document.querySelector(".seec2");
// const openbtn = document.getElementById("open_cart_btn");
// const cart = document.getElementById("sidecart");
// const closebtn = document.getElementById("close_btn");
// const backdrop = document.querySelector(".backdrop");
// const cartitems = document.querySelector(".cart_items");
// const itemnum = document.getElementById("items_num");
// const subtotalprice = document.getElementById("subtotal_price");

// let cart_data = JSON.parse(localStorage.getItem('cart_data')) || [];

// openbtn.addEventListener("click", opencart);
// closebtn.addEventListener("click", closecart);
// backdrop.addEventListener("click", closecart);

// rendercartitems();

// // Open cart
// function opencart() {
//     cart.classList.add("open");
//     backdrop.style.display = "block";
//     setTimeout(() => {
//         backdrop.classList.add("show");
//     }, 0);
// }

// // Close cart
// function closecart() {
//     cart.classList.remove("open");
//     backdrop.style.display = "none";
//     setTimeout(() => {
//         backdrop.classList.remove("show");
//     }, 500);
// }

// // Add items to cart
// function additem(idx, itemId) {
//     const foundeditem = cart_data.find((item) => item.id === itemId);
//     if (foundeditem) {
//         increaseqty(itemId);
//     } else {
//         cart_data.push(ITEMS[idx]);
//     }
//     updatecart();
//     opencart();
// }

// // Remove item from cart
// function removecartitem(itemId) {
//     cart_data = cart_data.filter((item) => item.id !== itemId);
//     updatecart();
// }

// // Increase quantity
// function increaseqty(itemId) {
//     cart_data = cart_data.map((item) => 
//         item.id === itemId ? { ...item, qty: item.qty + 1 } : item
//     );
//     updatecart();
// }

// // Decrease quantity
// function decreaseqty(itemId) {
//     cart_data = cart_data.map((item) => 
//         item.id === itemId ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty } : item
//     );
//     updatecart();
// }

// // Calculate items number
// function calcitemsnum() {
//     let itemscount = 0;
//     cart_data.forEach(item => itemscount += item.qty);
//     itemnum.innerText = itemscount;
// }

// // Calculate subtotal price
// function calcsubtotalprice() {
//     let subtotal = 0;
//     cart_data.forEach((item) => subtotal += item.price * item.qty);
//     subtotalprice.innerText = subtotal;
// }

// // Display / render cart items
// function rendercartitems() {
//     cartitems.innerHTML = "";
//     cart_data.forEach(item => {
//         const cartitem = document.createElement('div');
//         cartitem.classList.add('cart_item');
//         cartitem.innerHTML = `
//             <div class="remove_item" onclick="removecartitem(${item.id})"><span>&times;</span></div>
//             <div class="item_img"><img src="${item.image}"></div>
//             <div class="item_details">
//                 <p>${item.name}</p>
//                 <strong>${item.price} EGP</strong>
//                 <div class="qty">
//                     <span onclick="decreaseqty(${item.id})">-</span>
//                     <strong>${item.qty}</strong>
//                     <span onclick="increaseqty(${item.id})">+</span>
//                 </div>
//             </div>
//         `;
//         cartitems.appendChild(cartitem);
//     });
// }

// // Update cart and store data in localStorage
// function updatecart() {
//     // Render cart items with updated data
//     rendercartitems();
    
//     // Update items number in cart
//     calcitemsnum();
    
//     // Update subtotal price in cart
//     calcsubtotalprice();
    
//     // Store cart data in localStorage
//     localStorage.setItem('cart_data', JSON.stringify(cart_data));
// }

// // Load cart data from localStorage (when the page loads or refreshes)
// function loadCartFromLocalStorage() {
//     const savedCartData = localStorage.getItem('cart_data');
//     if (savedCartData) {
//         cart_data = JSON.parse(savedCartData);
//         updatecart();  // Update the cart display with the loaded data
//     }
// }

// // Call this function to load the cart when the page loads
// loadCartFromLocalStorage();





