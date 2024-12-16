document.addEventListener('DOMContentLoaded' ,()=>{

    var email=localStorage.getItem('Email');
    var name=localStorage.getItem('Name');
    var location=localStorage.getItem('Location');
    
    var firstName = name.split(' ')[0];

    document.getElementById("emailll").innerHTML=email;
    document.getElementById("nameh2").innerHTML=name;
    document.getElementById("addressp").innerHTML=location;
    document.getElementById("fname").innerHTML=firstName;
    document.getElementById("ffname").innerHTML=name;
    document.getElementById("addresspp").innerHTML=location;

    //////////////////////////////////////////////////////////////////////////////
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

////////

document.addEventListener('DOMContentLoaded', () => {
const profileImage = document.getElementById('profileImage');
const uploadImage = document.getElementById('uploadImage');

// Load the image from local storage if it exists
const storedImage = localStorage.getItem('profileImage');
if (storedImage) {
    profileImage.src = storedImage;
}

// Handle image upload
uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        // Save the uploaded image as a Base64 string in local storage
        const uploadedImage = e.target.result;
        localStorage.setItem('profileImage', uploadedImage);

        // Update the profile image
        profileImage.src = uploadedImage;
    };

    reader.readAsDataURL(file);
    }
});
});



document.getElementById('logoutLink').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    // Remove specific items from local storage
    localStorage.removeItem('Name');
    localStorage.removeItem('Email');
    localStorage.removeItem('Password');
    localStorage.removeItem('profileImage');
    localStorage.removeItem('Location');
    localStorage.removeItem('cart_data');

    // Redirect to index.html
    window.location.href = 'index.html';
});