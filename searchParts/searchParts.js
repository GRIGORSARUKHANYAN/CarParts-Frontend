function addModel() {
    const make = document.getElementById('make').value;
    let options = [];
if (make=="infiniti") {
     options = [
        { value: 'fx35 s50', text: 'fx35 s50' },
        { value: 'fx35 s51', text: 'fx35 s51' },
      { value: 'fx45', text: 'fx45' },
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

];
}else if(make=="volkswagen"){
  options = [
    { value: 'passat', text: 'passat' },
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
function reportNone() {
    const button = document.getElementById('buttonid');

    button.style.display = 'none';
}
function deletePartById(id) {
    console.log("deletePartById(id)",id);
    
    fetch(`https://carparts-t0mi.onrender.com/api/carPart/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {

            alert("Պահեստամասը ջնջված է")
let  updateDiv = document.getElementById('table-container');
updateDiv.innerHTML=`
    `

        })
        .catch((error) => {
          console.error("Error ", error);
          // Optionally, display an error message to the user
        });
}
function reqUpdatePart(id) {
    
    let data ={
        make:document.getElementById("updatemake").value.toLowerCase() ,
        model : document.getElementById("updatemodel").value.toLowerCase(),
        partName : document.getElementById("updatepartName").value.toLowerCase(),  
        position : document.getElementById("updateposition").value.toLowerCase(),  
        color : document.getElementById("updatecolor").value.toLowerCase(),  
        isOriginal : document.getElementById("updateisOriginal").checked,  
        location : document.getElementById("updatelocation").value.toLowerCase(),  
        noth : document.getElementById("updatenoth").value.toLowerCase(),  
        count : document.getElementById("updatecount").value,  
        price : document.getElementById("updateprice").value,  
    }  
    console.log(data,id);
    fetch(`https://carparts-t0mi.onrender.com/api/carPart/${id}`, {
        method: "PUT",
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
let  updateDiv = document.getElementById('table-container');

updateDiv.innerHTML=``
alert('պահեստամասը թարմացվեց')
        })
        .catch((error) => {
          console.error("Error ", error);
        });



}
function getPartById(id) {
    console.log("getPartById");
    
    fetch(`https://carparts-t0mi.onrender.com/api/carPart/${id}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
            data=data.result[0]
            
let  updateDiv = document.getElementById('table-container');
console.log(data);
updateDiv.innerHTML = `
    <div id="updateDiv" style="
        max-width: 400px;
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        margin: 30px auto;
        font-family: Arial, sans-serif;
    "> 
        ${generateInput("Մակնիշ", "updatemake", data.make)}
        ${generateInput("Մոդել", "updatemodel", data.model)}
        ${generateInput("Պահեստամասի անվանում", "updatepartName", data.partName)}
        ${generateInput("Դիրք", "updateposition", data.position)}
        ${generateInput("Գույն", "updatecolor", data.color)}
        ${generateCheckbox("Օրիգինալություն", "updateisOriginal", data.isOriginal)}
        ${generateInput("Գտնվելու վայր", "updatelocation", data.location)}
        ${generateTextarea("Նշումներ", "updatenoth", data.noth)}
        ${generateInput("Քանակ", "updatecount", data.count, "number")}
        ${generateInput("Գին", "updateprice", data.price, "number")}

        <button style="
            display: block;
            width: 100%;
            background-color: #039eff;
            color: white;
            font-size: 16px;
            padding: 12px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 10px;
        " onclick="reqUpdatePart('${data._id}')">Թարմացնել</button>
    </div>
`;

function generateInput(label, id, value, type = "text") {
    return `
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <h4 style="min-width: 130px; margin: 0; font-size: 14px; color: #333;">${label}</h4>
            <input id="${id}" type="${type}" placeholder="${label}" value="${value}" 
                style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; outline: none;">
        </div>
    `;
}

function generateTextarea(label, id, value) {
    return `
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <h4 style="min-width: 130px; margin: 0; font-size: 14px; color: #333;">${label}</h4>
            <textarea id="${id}" placeholder="${label}" 
                style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; outline: none; height: 60px; resize: none;">${value}</textarea>
        </div>
    `;
}

function generateCheckbox(label, id, checked) {
    return `
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <h4 style="min-width: 130px; margin: 0; font-size: 14px; color: #333;">${label}</h4>
            <input type="checkbox" id="${id}" ${checked ? "checked" : ""} 
                style="width: 18px; height: 18px; margin-left: 10px;">
        </div>
    `;
}


        })
        .catch((error) => {
          console.error("Error ", error);
          // Optionally, display an error message to the user
        });
}

function createTable(data) {
    const container = document.getElementById('table-container');

    const table = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>մակնիշ</th>
            <th>մոդել</th>
            <th>պահեստամասի անվան</th>
            <th>դիրք</th>
            <th>գույն</th>
            <th>օրիգինալություն</th>
            <th>գտնվելու վայր</th>
            <th>նշումներ</th>
            <th>քանակ</th>
            <th>գին</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.make}</td>
            <td>${item.model}</td>
            <td>${item.partName}</td>
            <td>${item.position}</td>
            <td>${item.color}</td>
            <td>${item.isOriginal ? 'Այո' : 'Ոչ'}</td>
            <td>${item.location}</td>
            <td>${item.noth}</td>
            <td>${item.count}</td>
            <td>${item.price}</td>
            <td> <i onclick="getPartById('${item._id}')" class="fa fa-pencil" style="font-size:24px"></i></td>
            <td> <i onclick="deletePartById('${item._id}')" class="fa fa-trash-o" style="font-size:34px; color:red"></i></td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    // Add the table to the container
    container.innerHTML = '';
    container.appendChild(table);
    container.style.position = 'relative';
container.style.zIndex = '1';
// container.style.color = '#ffffff'; // Ensure text color contrasts with the background
// container.style.padding = '20px';
}



function searchParts() {
   
    let data = generateData()

    console.log("aaaaaaaaaaa",data);
    
        req(data)
    
    }


    function seeresult(data) {
        data=data.result
        console.log(typeof data);
        
          const tableBody = document.querySelector("#carPartsTable tbody");

          // Populate the table

          data.forEach(item => {
            const row = document.createElement("tr");

      
            // Define the columns you want to show in the table
            const columns = [
              item.make || '',
              item.model || '',
              item.partName || '',
              item.position || '',
              item.color || '',
              item.original || '',
              item.location || '',
              item.notes || '',
              item.count || '',
              item.price || ''
            ];
      
            // Create table cells
            columns.forEach(columnData => {
              const cell = document.createElement("td");
              cell.textContent = columnData;
              row.appendChild(cell);
            });
      
            // Append the row to the table body
            tableBody.appendChild(row);
          });

          
      
    }
    // 
    
    function req(data) {
        fetch("https://carparts-t0mi.onrender.com/api/searchCarPart", {
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
console.log(data);
createTable(data.result);

// seeresult(data)
// createTable(data);


                //  document.getElementById("model").value=null
                //  document.getElementById("partName").value=null
                //  document.getElementById("position").value=null  
                //  document.getElementById("color").value=null
                //  document.getElementById("isOriginal").checked=false
                //  document.getElementById("location").value=null  
                //  document.getElementById("noth").value=null  
                //  document.getElementById("count").value=null  
                //  document.getElementById("price").value=null
            })
            .catch((error) => {
              console.error("Error ", error);
              // Optionally, display an error message to the user
            });
    }


    function generateData() {
        let data ={
            make:document.getElementById("make").value.toLowerCase() ,
            model : document.getElementById("model").value.toLowerCase(),
            partName : document.getElementById("partName").value.toLowerCase(),  
            position : document.getElementById("position").value.toLowerCase(),  
            color : document.getElementById("color").value.toLowerCase(),  
            isOriginal : document.getElementById("isOriginal").value,  
            location : document.getElementById("location").value.toLowerCase(),  
            noth : document.getElementById("noth").value.toLowerCase(),  
            count : document.getElementById("count").value,  
            price : document.getElementById("price").value,  
        }  
        let originalData ={
        }
        if (data.make) {
            originalData.make=data.make
        }
        if (data.model) {
            originalData.model=data.model
        }
        if (data.partName) {
            originalData.partName=data.partName
        }
        if (data.position) {
            originalData.position=data.position
        }
        if (data.color) {
            originalData.color=data.color
        }
        if (data.isOriginal=="1") {
            originalData.isOriginal=true
        }
        if (data.isOriginal=="2") {
            originalData.isOriginal=false
        }
        if (data.location) {
            originalData.location=data.location
        }
        if (data.noth) {
            originalData.noth=data.noth
        }
        if (data.count) {
            originalData.count=data.count
        }
        if (data.price) {
            originalData.price=data.price
        }
        return originalData
    }