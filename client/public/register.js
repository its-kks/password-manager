const signup = document.querySelector('#signup');
signup.addEventListener('click', async (e) => {
    const apiURL = '/api/users/register';
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;

    if(email && password && confirmPassword){
        if(password==confirmPassword){
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if(response.ok){
                window.location.href = `index.html`;
            }
            else{
                const errorData = await response.json();
                alert(errorData.message);
            }
        }
        else{
            alert("Passwords do not match");
        }
    }
    else{
        alert("All fields are required");
    }
});