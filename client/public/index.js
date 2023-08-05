let accessToken = "";
let loginBtn = document.getElementById("loginBtn");
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission
        handleLogin();
});
async function handleLogin() {
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let userData = {
        email: email,
        password: password
    };
    let responseData;
    try {
        // Send the POST request using fetch
        const response = await fetch("/api/users/login", {
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
            accessToken = responseData.accessToken;
            const username = email.split('@')[0];
            setCookie('accessToken',accessToken,15);
            setCookie('userName',username,60);
            window.location.href = `userData.html`;
        }
    } catch (error) {
        // Request failed or an error occurred
        if(responseData==undefined){
            alert("Failed to reach server");
        }
        else{
            alert(responseData.message);
        }
        console.error("Login failed: ", error.message);
    }
}

function setCookie(name, value, minutesToExpire) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (minutesToExpire) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (minutesToExpire * 60 * 1000));
      cookieString += `; expires=${expirationDate.toUTCString()}`;
    }
    document.cookie = cookieString;
}