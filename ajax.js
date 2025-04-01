const apiUrl = "http://gamf.nhely.hu/ajax2/";
const myCode = "NK.";

const sendRequest = (formData, successCallback, errorCallback) => {
  fetch(apiUrl, { method: "POST", body: formData })
    .then(response => response.json())
    .then(successCallback)
    .catch(errorCallback);
};

function createRecord() {
  const name = document.getElementById("createName").value.trim();
  const height = document.getElementById("createHeight").value.trim();
  const weight = document.getElementById("createWeight").value.trim();

  if (!name || !height || !weight || name.length > 30) {
    document.getElementById("createMsg").innerText = "Hibás adatbevitel!";
    return;
  }

  const formData = new FormData();
  formData.append("op", "create");
  formData.append("name", name);
  formData.append("height", height);
  formData.append("weight", weight);
  formData.append("code", myCode);

  sendRequest(formData,
    data => document.getElementById("createMsg").innerText = "Létrehozva: " + JSON.stringify(data),
    err => document.getElementById("createMsg").innerText = "Hiba: " + err
  );
}

function readRecords() {
  const formData = new FormData();
  formData.append("op", "read");
  formData.append("code", myCode);

  sendRequest(formData,
    data => {
      const resultDiv = document.getElementById("readResult");
      resultDiv.innerHTML = "";
      
      if (data.list && data.list.length > 0) {
        data.list.forEach(item => {
          const line = `ID: ${item.id}, Név: ${item.name}, Height: ${item.height}, Weight: ${item.weight}, Code: ${item.code}`;
          
          const p = document.createElement("p");
          p.innerText = line;
          resultDiv.appendChild(p);
        });

        const heights = data.list.map(item => parseFloat(item.height));
        const sum = heights.reduce((a, b) => a + b, 0);
        const avg = sum / heights.length;
        const max = Math.max(...heights);
        
        const summary = document.createElement("p");
        summary.innerText = `Height - Összeg: ${sum}, Átlag: ${avg.toFixed(2)}, Legnagyobb: ${max}`;
        resultDiv.appendChild(summary);
      } else {
        resultDiv.innerText = "Nincs adat.";
      }
    },
    err => document.getElementById("readResult").innerText = "Hiba: " + err
  );
}




function getDataForId() {
  const id = document.getElementById("updateId").value.trim();
  if (!id) {
    alert("Add meg az ID-t!");
    return;
  }
  const formData = new FormData();
  formData.append("op", "read");
  formData.append("code", myCode);

  sendRequest(formData,
    data => {
      if (data.list && data.list.length > 0) {
        const record = data.list.find(item => item.id === id);
        if (record) {
          document.getElementById("updateName").value = record.name;
          document.getElementById("updateHeight").value = record.height;
          document.getElementById("updateWeight").value = record.weight;
        } else {
          alert("Nincs ilyen ID a te kódod alatt!");
        }
      }
    },
    err => alert("Hiba: " + err)
  );
}

function updateRecord() {
  const id = document.getElementById("updateId").value.trim();
  const name = document.getElementById("updateName").value.trim();
  const height = document.getElementById("updateHeight").value.trim();
  const weight = document.getElementById("updateWeight").value.trim();

  if (!id || !name || !height || !weight || name.length > 30) {
    document.getElementById("updateMsg").innerText = "Hibás adatbevitel!";
    return;
  }

  const formData = new FormData();
  formData.append("op", "update");
  formData.append("id", id);
  formData.append("name", name);
  formData.append("height", height);
  formData.append("weight", weight);
  formData.append("code", myCode);

  sendRequest(formData,
    data => document.getElementById("updateMsg").innerText = "Módosítva: " + JSON.stringify(data),
    err => document.getElementById("updateMsg").innerText = "Hiba: " + err
  );
}

function deleteRecord() {
  const id = document.getElementById("deleteId").value.trim();
  if (!id) {
    document.getElementById("deleteMsg").innerText = "Add meg az ID-t!";
    return;
  }
  const formData = new FormData();
  formData.append("op", "delete");
  formData.append("id", id);
  formData.append("code", myCode);

  sendRequest(formData,
    data => document.getElementById("deleteMsg").innerText = "Törölve: " + JSON.stringify(data),
    err => document.getElementById("deleteMsg").innerText = "Hiba: " + err
  );
}
