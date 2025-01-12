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

updateDiv.innerHTML=`
    <div id="updateDiv" style="  margin-left: 30%;"> 
     
  <input id="updatemake" placeholder="մակնիշ" value="${data.make}"><br>
    <input id="updatemodel" placeholder="մոդել" value="${data.model}"><br>
    <input id="updatepartName" placeholder="պահեստամասի անվան" value="${data.partName}"><br>
    <input id="updateposition" placeholder="դիրք" value="${data.position}"><br>
    <input id="updatecolor" placeholder="գույն" value="${data.color}"><br>

        <div style="display: flex;">
        <p>օրիգինալություն</p> <input type="checkbox" ${data.isOriginal ? "checked" : ""}  id="updateisOriginal"><br>
        </div>
    <input id="updatelocation"  placeholder="գտնվելու վայր" value="${data.location}"><br>
    <textarea id="updatenoth" placeholder="նշումներ"  >${data.noth}</textarea><br>
    <input id="updatecount" type="number"  placeholder="քանակ"value="${data.count}"><br>
    <input id="updateprice" type="number"  placeholder="գին" value="${data.price}"><br>
    <button style="border-radius: 20px; width: 120px; height: 50px; background-color: rgb(3, 158, 255);" onclick="reqUpdatePart('${data._id}')"> Թարմացնել</button>

    </div>
    `

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