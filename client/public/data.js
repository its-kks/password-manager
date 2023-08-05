const cookieValues = extractCookieValues(document.cookie);
const userName = cookieValues.userName;
const accessToken = cookieValues.accessToken;
const credentialsTable = document.querySelector("#dataTable");

const heading = document.querySelector("h1");
heading.textContent = `Hi, ${userName}!`;

let credentialArray;

async function fetchPasswords() {
  try {
    const response = await fetch("/api/passwords", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    credentialArray = data;
    addToTable(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function extractCookieValues(cookieString) {
  const cookiesArray = cookieString.split("; ");
  const cookieValues = {};

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookieValues[key] = decodeURIComponent(value);
  });

  return cookieValues;
}

function addRow(obj){
    const row = document.createElement("tr");

    const del = document.createElement("td");
    row.appendChild(del);

    const username = document.createElement("td");
    username.textContent = obj.username;
    username.classList.add("copyable");
    row.appendChild(username);

    const password = document.createElement("td");
    password.textContent = obj.password;
    password.classList.add("copyable");
    row.appendChild(password);

    const website = document.createElement("td");
    website.textContent = obj.website;
    website.classList.add("copyable");
    row.appendChild(website);

    const update = document.createElement("td");
    row.appendChild(update);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
    deleteIcon.addEventListener("click", () => handleDelete(obj,row)); // Add event listener if you want to handle the delete action
    del.appendChild(deleteIcon);

    const updateIcon = document.createElement("i");
    updateIcon.classList.add("fas", "fa-edit", "update-icon");
    updateIcon.addEventListener("click", () => changeToUpdate(obj,username,password,website,update)); // Add event listener if you want to handle the update action
    update.appendChild(updateIcon);
    return row;
}

function addToTable(array) {
  for (let obj of array) {
    const row = addRow(obj);
    credentialsTable.appendChild(row);
  }
  //add fields to add data
  const row = document.createElement("tr");
  credentialsTable.appendChild(row);

  const del = document.createElement("td");
  row.appendChild(del);

  const username = document.createElement("td");
  username.appendChild(document.createElement("input"));
  row.appendChild(username);

  const password = document.createElement("td");
  password.appendChild(document.createElement("input"));
  row.appendChild(password);

  const website = document.createElement("td");
  website.appendChild(document.createElement("input"));
  row.appendChild(website);

  const update = document.createElement("td");
  row.appendChild(update);

  const addIcon = document.createElement("i");
  addIcon.classList.add("fas", "fa-plus", "add-icon");
  addIcon.addEventListener("click", () => handleAdd(username,password,website));
  update.appendChild(addIcon);

  handleCopy();
}

fetchPasswords();

function handleCopy(){
    const copyable = document.querySelectorAll(".copyable");
    copyable.forEach((element) => {
        element.addEventListener("click", () => {
            const text = element.textContent;
            navigator.clipboard.writeText(text);
        });
    });
}

const handleDelete = async (obj,row) => {
  const id = obj.id;
  try {
    const response = await fetch(`/api/passwords/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
      throw new Error(errorData.message || 'Failed to delete Password');
    }

    const deletedPassword = await response.json();
    row.remove();
    console.log('Password deleted successfully:', deletedPassword);

  } catch (error) {
    console.log('Error deleting password', error.message);
  }
};

const handleAdd = async (inpUsername,inpPassword,inpWebsite) =>{
  const username = inpUsername.querySelector('input').value;
  const password = inpPassword.querySelector('input').value;
  const website = inpWebsite.querySelector('input').value;

  inpUsername.querySelector('input').value = "";
  inpPassword.querySelector('input').value = "";
  inpWebsite.querySelector('input').value = "";

  try{
    const response = await fetch('/api/passwords',{
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        website,
        password,
      })
    });

    if(!response.ok){
      const errorData = await response.json();
      throw new Error(errorData.mssage || 'Failed to add password');
    }
    const createdPassword = await response.json();
    console.log('Password created succesfull',createdPassword);
    const row = addRow({
        username,
        website,
        password,
    });
    const lastRow = credentialsTable.lastChild;
    credentialsTable.insertBefore(row,lastRow);
  } catch (error){
    console.error('Error creating password:', error.message);
  }
}



const changeToUpdate = async (obj, usernameTD, passwordTD, websiteTD, updateTD) => {
  const id = obj.id;
  usernameTD.innerHTML = `<input value="${obj.username}">`;
  passwordTD.innerHTML = `<input value="${obj.password}">`;
  websiteTD.innerHTML = `<input value="${obj.website}">`;

  const updateIcon = updateTD.querySelector('i');
  updateIcon.remove();

  const tickIcon = document.createElement("i");
  tickIcon.classList.add("fas", "fa-check", "tick-icon");
  tickIcon.addEventListener('click', () => handleUpdate(obj, usernameTD, passwordTD, websiteTD, updateTD));
  updateTD.appendChild(tickIcon);
};


const handleUpdate = async (obj, usernameTD, passwordTD, websiteTD, updateTD) => {
  const id = obj.id;
  const username = usernameTD.querySelector('input').value;
  const password = passwordTD.querySelector('input').value;
  const website = websiteTD.querySelector('input').value;

  console.log(userName);
  console.log(password);
  console.log(website);
  
  if(username && password && website){
    // Set the new text values
    usernameTD.textContent = username;
    passwordTD.textContent = password;
    websiteTD.textContent = website;
    try{
      const response = await fetch(`/api/passwords/${id}`,{
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            website,
            password,
            })
        });
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update password');
        }
        const updatedPassword = await response.json();
        const tickIcon = updateTD.querySelector('i');

        //updating the data in the table
        tickIcon.remove();

        const updateIcon = document.createElement("i");
        updateIcon.classList.add("fas", "fa-edit", "update-icon");
        updateIcon.addEventListener('click', () => changeToUpdate(obj, usernameTD, passwordTD, websiteTD, updateTD));
        updateTD.appendChild(updateIcon);
        console.log('Password updated succesfull',updatedPassword);


    } catch (error){
      console.error('Error updating password:', error.message);
    }
  }
  else{
    alert('All fields are mandatory');
  }
};