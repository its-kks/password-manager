let accessToken = "";

var loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        handleLogin();
});
async function handleLogin() {
    console.log("Login clicked");
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var userData = {
        email: email,
        password: password
    };
    let responseData;
    try {
        // Send the POST request using fetch
        const response = await fetch("http://localhost:3000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Parse the response data as JSON
        responseData = await response.json();
        


        if (!response.ok) {
            throw new Error("Error: " + response.status);
        }
        else{
            console.log(responseData);
        }
    } catch (error) {
        // Request failed or an error occurred
        if(responseData==undefined){
            alert("Filed to reach server");
        }
        else{
            alert(responseData.message);
        }
        console.error("Login failed: ", error.message);
        // Handle the error appropriately (e.g., display an error message to the user)
    }
}
