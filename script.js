document.querySelector('.container').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = event.target.elements.uname.value;
    const password = event.target.elements.psw.value;

    try {
        const response = await fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Success:", data.message);
        } else {
            console.log("Fail:", data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
