document.addEventListener('DOMContentLoaded', displayFiles);

const iconMap = {
    'pdf': 'pdf.png',
    'jpg': 'jpg.png',
    'jpeg': 'jpeg.jpeg',
    'svg': 'svg.png',
    'zip': 'zip.png'
};

async function displayFiles() {
    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get('folder');

    try {
        const response = await fetch(`http://localhost:3000/files?folder=${folderName}`);
        const files = await response.json();
        const filesContainer = document.getElementById('filesContainer');
        filesContainer.innerHTML = '';

        const confirmationBox = document.getElementById('confirmationBox');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        let filename = '';
        async function showConfirmationDialog(fileName) {
            confirmationBox.style.display = 'block';
            filename = fileName;
        }

        confirmBtn.addEventListener('click', () => {
            confirmationBox.style.display = 'none';
            const response = fetch(`http://localhost:3000/delete?file=${encodeURIComponent(filename)}`);
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


        const filesname = files.map(fileObj => fileObj.url);
        filesname.forEach((fileObj, index) => {
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
            card.appendChild(deleteButton);
            filesContainer.appendChild(card);
        });

        const totalFilesSpan = document.querySelector('.total .num');
        totalFilesSpan.textContent = filesname.length;

    } catch (error) {
        console.error(`Error fetching files for folder ${folderName}:`, error);
    }
}
