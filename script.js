document.querySelector('.form-inner').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const isSignUp = event.submitter.classList.contains('signup-btn');
    console.log(isSignUp);
    if(isSignUp){
        console.log("signing in");
        const username = event.target.elements.sname.value;
        const password = event.target.elements.spass.value;
        const cpassword = event.target.elements.cspass.value;
        const email = event.target.elements.smail.value;
        console.log(email);
        const isAdmin = false;
        const isLogin = false;
        if(!username || !password || !cpassword || !email){
            showError("Please enter all data mentioned !!");
        }
        else if(cpassword != password){
            showError("Confirm Password and Password are not same !!");
        }
        else signUp(username,password,isAdmin,isLogin,email);
    }
    else{
        const username = event.target.elements.uname.value;
        console.log(username);
        const password = event.target.elements.psw.value;
        login(username, password);
    }
});

async function signUp(username, password, isAdmin, isLogin, email) {
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isAdmin, isLogin, email }),
    })
        .then(async (response) => {
            if (response.status < 300) {
                window.location.href = 'index.html';
                return response.json();
            } else {
                showError('There was a problem with the signup operation. ');
            }
        })
        .then((data) => {
            form.reset();
            console.log(data.message);
        })
        .catch((error) => {
            showError('There was a problem with the signup operation. ');
        });
}

async function login(username, password) {
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(async (response) => {
            if (response.ok) {
                return response.json();
            } else {
                const error = await response.json();
                showError('Username or Password is incorrect. ');
            }
        })
        .then((data) => {
            console.log(data.message);
            window.location.href = './dashboard.html';
        })
        .catch((error) => {
            showError('There was a problem with the login operation. ');
        });
}
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    errorText.textContent = message;
    errorMessage.classList.add('show');
}

function closeErrorMessage() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('show');
}