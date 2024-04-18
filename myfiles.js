const foldersContainer = document.getElementById('foldersContainer');
const filesContainer = document.getElementById('filesContainer');

async function displayFiles(folderName, folderElement) {
    try {
        const response = await fetch(`http://localhost:3000/files?folder=${folderName}`);
        const files = await response.json();

        const filesContainer = document.createElement('div');
        filesContainer.classList.add('files-container');
        folderElement.appendChild(filesContainer);

        const filesname = files.map(fileObj => fileObj.url);
        filesname.forEach(fileObj => {
            const fileName = fileObj.split('\\').slice(-1)[0]; 
            const fileElement = document.createElement('div');
            const fileLink = document.createElement('a');
            fileLink.href = fileObj;
            fileLink.target = "_blank"; 
            fileElement.textContent = fileName;
            fileLink.appendChild(fileElement);
            fileLink.classList.add('file');
            filesContainer.appendChild(fileLink);
        });
    } catch (error) {
        console.error(`Error fetching files for folder ${folderName}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const foldersContainer = document.getElementById('foldersContainer');

    async function displayFolders() {
        try {
            const response = await fetch('http://localhost:3000/folders');
            const folders = await response.json();
            console.log(folders);
            foldersContainer.innerHTML = '';
            folders.forEach(folder => {
                const folderElement = document.createElement('div');
                folderElement.textContent = folder;
                folderElement.classList.add('folder');
                folderElement.addEventListener('click', async () => {
                    redirectToFilesPage(folder)
                });
                foldersContainer.appendChild(folderElement);
            });
        } catch (error) {
            console.error('Error fetching folders:', error);
        }
    }

    function redirectToFilesPage(folderName) {
        const url = `files.html?folder=${encodeURIComponent(folderName)}`;
        window.open(url, '_blank');
    }

    displayFolders();
});
