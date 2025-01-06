function addParts() {
   
let data ={
    make:document.getElementById("make").value.toLowerCase() ,
    model : document.getElementById("model").value.toLowerCase(),
    partName : document.getElementById("partName").value.toLowerCase(),  
    position : document.getElementById("position").value.toLowerCase(),  
    color : document.getElementById("color").value.toLowerCase(),  
    isOriginal : document.getElementById("isOriginal").checked,  
    location : document.getElementById("location").value.toLowerCase(),  
    noth : document.getElementById("noth").value.toLowerCase(),  
    count : document.getElementById("count").value,  
    price : document.getElementById("price").value,  
}  
if (validationData(data)) {
    
    req(data)
}
}
function validationData(data) {
    if (!data.make || !data.model || !data.partName || !data.position  || !data.location || !data.count || !data.price) {
         alert("լրացրեք բոլոր դաշտերը")
         return false
    }
    return true
}

function req(data) {
    fetch("https://carparts-t0mi.onrender.com/api/carPart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
             document.getElementById("model").value=null
             document.getElementById("partName").value=null
             document.getElementById("position").value=null  
             document.getElementById("color").value=null
             document.getElementById("isOriginal").checked=false
             document.getElementById("location").value=null  
             document.getElementById("noth").value=null  
             document.getElementById("count").value=null  
             document.getElementById("price").value=null
        })
        .catch((error) => {
          console.error("Error ", error);
          // Optionally, display an error message to the user
        });
}