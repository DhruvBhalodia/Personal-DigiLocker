document.addEventListener('DOMContentLoaded', displayFiles);

const iconMap = {
    'pdf': 'pdf.png',
    'jpg': 'jpg.png',
    'jpeg': 'jpeg.jpeg',
    'svg': 'svg.png',
    'zip': 'zip.png'
};

async function displayFiles() {

    try {
        const response = await fetch(`http://localhost:3000/tfiles`);
        const files = await response.json();
        const filesContainer = document.getElementById('filesContainer');
        filesContainer.innerHTML = '';

        const confirmationBox = document.getElementById('confirmationBox');
        const confirmationBoxR = document.getElementById('confirmationBoxR');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const confirmBtnR = document.getElementById('confirmBtnR');
        const cancelBtnR = document.getElementById('cancelBtnR');
        let filename = '';
        let filenameR = '';

        async function showConfirmationDialog(fileName) {
            confirmationBox.style.display = 'block';
            filename = fileName;
        }
        async function showConfirmationDialogR(fileName) {
            confirmationBoxR.style.display = 'block';
            filenameR = fileName;
        }

        confirmBtn.addEventListener('click', () => {
            confirmationBox.style.display = 'none';
            const response = fetch(`http://localhost:3000/deleteR?file=${encodeURIComponent(filename)}`);
            if(!response.ok){
                console.log("error in deletation");
                window.location.reload();
            }
            else{
                console.log("Successfully deleted")
            }
            filename = '';
        });

        cancelBtn.addEventListener('click', () => {
            confirmationBox.style.display = 'none';
            filename = '';
        });
        confirmBtnR.addEventListener('click', () => {
            confirmationBoxR.style.display = 'none';
            const response = fetch(`http://localhost:3000/retrieve?file=${encodeURIComponent(filenameR)}`);
            if(response >= 300){
                console.log("error in deletation");
            }
            else{
                console.log("Successfully deleted");
                window.location.reload();
            }
            filenameR = '';
        });

        cancelBtnR.addEventListener('click', () => {
            confirmationBoxR.style.display = 'none';
            filenameR = '';
        });


        const filesname = files.map(fileObj => fileObj.url);
        filesname.forEach((fileObj) => {
            const card = document.createElement('div');
            card.classList.add('card');
            const fileName = fileObj.split('\\').slice(-1)[0];

            const fileExtension = fileName.split('.').pop().toLowerCase();
            const iconUrl = iconMap[fileExtension] || 'default-icon.png';

            const iconImg = document.createElement('img');
            iconImg.src = iconUrl;
            iconImg.alt = fileName;
            iconImg.classList.add('file-icon');
            card.appendChild(iconImg);


            const fileElement = document.createElement('div');
            const fileLink = document.createElement('a');
            fileLink.href = fileObj;
            fileLink.target = "_blank";
            fileElement.textContent = fileName;
            fileLink.appendChild(fileElement);
            fileLink.classList.add('file');
            card.appendChild(fileLink);

            const deleteButton = document.createElement('img');
            deleteButton.src = 'delete.png';
            deleteButton.classList.add('delete-btn');
            deleteButton.setAttribute('id', 'dbtn');
            deleteButton.addEventListener('click', () => {
                showConfirmationDialog(fileObj);
            });

            const retrieveButton = document.createElement('img');
            retrieveButton.src = 'retrieve.png';
            retrieveButton.classList.add('rtrv-btn');
            retrieveButton.setAttribute('id', 'rbtn');
            retrieveButton.addEventListener('click', () => {
                showConfirmationDialogR(fileObj);
            });
            card.appendChild(deleteButton);
            card.appendChild(retrieveButton);
            filesContainer.appendChild(card);
        });

        const totalFilesSpan = document.querySelector('.total .num');
        totalFilesSpan.textContent = filesname.length;

    } catch (error) {
        console.error(`Error fetching files :`, error);
    }
}
