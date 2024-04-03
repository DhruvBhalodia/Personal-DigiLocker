document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = event.target.elements.uname.value;
    const password = event.target.elements.psw.value;
    const isSignUp = event.submitter.classList.contains('signup-btn'); // Check if the clicked button is the signup button

    if (isSignUp) {
        signUp(username, password);
    } else {
        login(username, password);
    }
});

async function signUp(username, password) {
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(error => { throw new Error(error.message) });
        }
    })
    .then((data) => {
        console.log(data.message);
    })
    .catch((error) => {
        console.log('There was a problem with the signup operation:', error);
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
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(error => { throw new Error(error.message) });
        }
    })
    .then((data) => {
        console.log(data.message);
    })
    .catch((error) => {
        console.log('There was a problem with the login operation:', error);
    });
}
