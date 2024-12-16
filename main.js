//header 
document.addEventListener("DOMContentLoaded",function(){
    burger=document.querySelector(".fa-bars");
        burger.onclick=function(){
            navbar=document.querySelector(".nav_middle");
            navbar.classList.toggle("active");
}
})
///////////////////////////////////////////////////////////////////
$(document).ready(function() {
	
	setTimeout(function(){
		$('body').addClass('loaded');
		$('h1').css('color','#222222');
	}, 3000);
	
});
/////////////////////////////////////////////////////////////////

//function for icons heart to red
function red(x){
    x.classList.toggle("fa-solid");
    if(x.classList.contains("fa-solid")){
        x.style.color="#D43A5E";
    }
    else{
        x.style.color="#000";
    }
}
//////////////////////////////////////////////////////////////////

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    var mybutton = document.getElementById("myBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        if(mybutton){    
            mybutton.style.display = "block";
        }
    } else {
        if(mybutton){    
            mybutton.style.display = "none";
        }
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//////////////////////////////////////////////////////////////////////

//function for validation form for sign up page

var submitbtn=document.getElementById("submitbtn");
if(submitbtn){
    submitbtn.disabled=true;
}
function valid(x){
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var emailerror=document.getElementById("emailerror");
    var passworderror=document.getElementById("passworderror");
    var outemail=document.getElementById("email");
    var outpass=document.getElementById("password");
    if(name.length<=0){
        submitbtn.disabled=true;
    }
    if(email.indexOf("@")==-1 || email.length<=0  ||email.indexOf(".com")==-1){
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
    password.length<60 && name.length>0 && x.checked==true){
        submitbtn.disabled=false;
    }
}
/////////////////////////////////////////////////////////////////////////////
//function validiation form for login
function validlog(x){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var emailerror=document.getElementById("emailerror");
    var passworderror=document.getElementById("passworderror");
    var outemail=document.getElementById("email");
    var outpass=document.getElementById("password");
    if(email.indexOf("@")==-1 || email.length<=0){
        emailerror.innerHTML=" * Please enter a valid email";
        outemail.style.border="1px solid red";
        submitbtn.disabled=true;
    }else if(email.indexOf("@")>-1 && email.length>0){
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
    if(x.checked ){
        submitbtn.disabled=false;
    }else{
        submitbtn.disabled=true;
    }
    if(email.indexOf("@")>-1 && email.length>0 && password.length>8 &&
    password.length<60 && x.checked==true){
        submitbtn.disabled=false;
    }
}
////////////////////////////////////////////////////////////////////////
//function send email for sign up page
async function sendmail() {
    // Get input elements
    var nameinput = document.getElementById("name");
    var emailinput = document.getElementById("email");
    var passwordinput = document.getElementById("password");
    var locationinput = document.getElementById("location");
    var btn = document.getElementById("submitbtn");

    // Set up emailjs service and template IDs
    var serviceid = "service_h7tdctr";
    var templateid = "template_0ppgg6w";

    // Disable the submit button to prevent multiple submissions
    btn.disabled = true;
    btn.innerHTML = "Loading...";

    // Prepare the input fields for email
    var inputfields = {
        name: nameinput.value,
        email: emailinput.value,
        password: passwordinput.value,
        location: locationinput.value
    };

    try {
        // Send email via emailjs
        const res = await emailjs.send(serviceid, templateid, inputfields);
        
        // Update button text on success
        btn.innerHTML = "Sent Successfully";

        // Store form data in localStorage
        localStorage.setItem("Name", nameinput.value);
        localStorage.setItem("Email", emailinput.value);
        localStorage.setItem("Password", passwordinput.value);
        localStorage.setItem("Location", locationinput.value);

        // Clear input fields after successful submission
        nameinput.value = "";
        emailinput.value = "";
        passwordinput.value = "";
        locationinput.value = "";

        // Log response for debugging
        console.log(res);

        // Display success message with SweetAlert
        swal({
            title: "Congratulations!",
            text: "We're really happy to have you join the Tulip family",
            icon: "images/check_ring_round.png",
            button: "OK"
        }).then(function () {
            // Redirect the user to the login page after the success message
            window.location.href = 'profile.html';
        });

    } catch (error) {
        // Handle any errors that occur during the email sending process
        console.error('Error sending email:', error);
        swal({
            title: "Error!",
            text: "Something went wrong. Please try again later.",
            icon: "error",
            button: "OK"
        });
    }
}

///////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('Email'); 
    const userLink = document.getElementById('userLink');

    if (userEmail) {
      userLink.href = 'profile.html'; // Navigate to profile if email is found
    } else {
      userLink.href = 'signup.html'; // Navigate to signup if email is not found
    }
});


// Check if the profile image exists in local storage
const profileImage = localStorage.getItem('profileImage');  // Replace 'profileImage' with the actual key used in local storage
const userLink = document.getElementById("userLink");

if (profileImage) {
    // If the profile image exists, replace the icon with the profile image
    const img = document.createElement("img");
    img.src = profileImage;  // Set the source to the image URL stored in local storage
    img.alt = "Profile Image";
    img.style.width = "35px";  // Adjust the size of the image as needed
    img.style.height = "35px";  // Adjust the size of the image as needed
    img.style.borderRadius = "50%";  // Optional: makes the image round

    // Replace the icon with the image
    userLink.innerHTML = "";  // Remove the current icon
    userLink.appendChild(img);  // Add the image to the userLink
} else {
    // If no profile image exists, keep the default icon
    userLink.innerHTML = '<i class="fa-regular fa-user"></i>';
}
