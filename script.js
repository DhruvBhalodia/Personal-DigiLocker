document.querySelector('.container').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target.elements.uname.value;
    const password = event.target.elements.psw.value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log("Success");
        } else {
            console.log("Fail");
        }
    });
});
