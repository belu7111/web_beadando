let data = [];

document.getElementById("createForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let d1 = document.getElementById("input1").value;
  let d2 = document.getElementById("input2").value;
  let d3 = document.getElementById("input3").value;
  let d4 = document.getElementById("input4").value;

 
  if (d1 === "" || d2 === "" || d3 === "" || d4 === "") {
    alert("Minden mező kötelező!");
    return;
  }
  if (d1.length > 30 || d2.length > 30 || d3.length > 30 || d4.length > 30) {
    alert("Minden mező max 30 karakter lehet!");
    return;
  }


  let newRecord = { col1: d1, col2: d2, col3: d3, col4: d4 };
  data.push(newRecord);
  renderTable();
  this.reset();
});

function renderTable() {
  let tbody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  data.forEach((record, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${record.col1}</td>
      <td>${record.col2}</td>
      <td>${record.col3}</td>
      <td>${record.col4}</td>
      <td>
        <button onclick="deleteRecord(${index})">Törlés</button>
        <button onclick="editRecord(${index})">Szerkesztés</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function deleteRecord(index) {
  if (confirm("Biztos törli a rekordot?")) {
    data.splice(index, 1);
    renderTable();
  }
}

function editRecord(index) {
  let record = data[index];
  let newCol1 = prompt("Oszlop 1 új érték:", record.col1);
  let newCol2 = prompt("Oszlop 2 új érték:", record.col2);
  let newCol3 = prompt("Oszlop 3 új érték:", record.col3);
  let newCol4 = prompt("Oszlop 4 új érték:", record.col4);

  if (newCol1 && newCol2 && newCol3 && newCol4) {
    data[index] = { col1: newCol1, col2: newCol2, col3: newCol3, col4: newCol4 };
    renderTable();
  } else {
    alert("Minden mezőt ki kell tölteni!");
  }
}


function sortTable(n) {
  data.sort((a, b) => {
    let valA = Object.values(a)[n].toUpperCase();
    let valB = Object.values(b)[n].toUpperCase();
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    return 0;
  });
  renderTable();
}


function filterTable(n) {
  let input = document.getElementById("search" + n);
  let filter = input.value.toUpperCase();
  let tbody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
  let tr = tbody.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[n];
    if (td) {
      let txtValue = td.textContent || td.innerText;
      tr[i].style.display = (txtValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
    }
  }
}
