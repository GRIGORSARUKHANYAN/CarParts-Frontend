function addModel() {
  const make = document.getElementById('make').value;
  let options = [];
if (make=="infiniti") {
   options = [
      { value: 'fx35 s50', text: 'fx35 s50' },
      { value: 'fx35 s51', text: 'fx35 s51' },
      { value: 'q50', text: 'q50' },
];
}else if (make=="chevrolet") {
  options = [
      { value: 'volt 1', text: 'volt 1' },
      { value: 'volt 2', text: 'volt 2' },
];
}else if (make=="nissan") {
  options = [
      { value: 'sentra', text: 'sentra' },
      { value: 'skyline', text: 'skyline' },
      { value: 'rogue', text: 'rogue' },
      { value: 'altima', text: 'altima' },
      { value: 'xtrile', text: 'xtrile' },

];
}
  const selectElement = document.getElementById('model');
  selectElement.innerHTML = '';
  options.forEach(optionData => {
      const option = document.createElement('option'); // Create <option> element
      option.value = optionData.value;                // Set the value attribute
      option.textContent = optionData.text;           // Set the text content
      selectElement.appendChild(option);              // Append the option to the <select>
  });
}
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
            //  document.getElementById("partName").value=null
             document.getElementById("position").value=null  
             document.getElementById("color").value=null
             document.getElementById("isOriginal").checked=true
            //  document.getElementById("location").value=null  
             document.getElementById("noth").value=null  
             document.getElementById("count").value=null  
             document.getElementById("price").value=null
             alert("պահեստամասը հաստատված է")
        })
        .catch((error) => {
          console.error("Error ", error);
          // Optionally, display an error message to the user
        });
}