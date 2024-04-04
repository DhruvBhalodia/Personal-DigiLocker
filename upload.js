document.addEventListener('DOMContentLoaded', () => {
    const fInput = document.getElementById('fileInput');
    const pBar = document.getElementById('progressBar');
    const pText = document.getElementById('progressText');
    const fName = document.getElementById('fileName');
    const cBtn = document.getElementById('clearButton');
    const uploadMessage = document.getElementById('uploadMessage');

    fInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadstart = () => {
                pBar.style.width = '0%';
                pText.style.display = 'block';
                pText.innerText = '0%';
                cBtn.style.display = 'none';
                uploadMessage.textContent = ''; // Clear the upload message
            };
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress =
                        (event.loaded / event.total) * 100;
                    pBar.style.width = `${progress}%`;
                    pText.innerText = `${Math.round(progress)}%`;
                }
            };
            reader.onload = () => {
                const uploadTime = 4000;
                const interval = 50;
                const steps = uploadTime / interval;
                let currentStep = 0;
                const updateProgress = () => {
                    const progress = (currentStep / steps) * 100;
                    pBar.style.width = `${progress}%`;
                    pText.innerText = `${Math.round(progress)}%`;
                    currentStep++;

                    if (currentStep <= steps) {
                        setTimeout(updateProgress, interval);
                    } else {
                        pBar.style.width = '100%';
                        pText.innerText = '100%';
                        fName.innerText = `File Name: ${file.name}`;
                        cBtn.style.display = 'block';
                        uploadMessage.textContent = 'Successfully Uploaded'; // Display the upload message
                    }
                };
                setTimeout(updateProgress, interval);
                    let url = reader.result;
                    console.log(url);
                 upload(url);
                 async function upload(url) {
                     fetch('http://localhost:3000/upload', {
                         method: 'POST',
                         headers: {
                             'Content-Type': 'application/json',
                         },
                         body: JSON.stringify({ url }),
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
                            console.log('There was a problem with the upload operation:', error);
                        });
                 }    
            };
            reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file.');
                fInput.value = '';
            }
    });

    cBtn.addEventListener('click', () => {
        fInput.value = '';
        pBar.style.width = '0%';
        pText.style.display = 'none';
        fName.innerText = '';
        cBtn.style.display = 'none';
        uploadMessage.textContent = ''; // Clear the upload message
    });
});

document.querySelector('#logout').addEventListener('click', async (event) => {
    event.preventDefault();
    logout();
    async function logout() {
        fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
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
                window.location.href = './index.html';
            })
            .catch((error) => {
                console.log('There was a problem with the logout operation:', error);
            });
    }    
})