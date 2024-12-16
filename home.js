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