const foldersContainer = document.getElementById('foldersContainer');
const filesContainer = document.getElementById('filesContainer');

async function displayFolders() {
    try {
        const response = await fetch('http://localhost:3000/folders');
        const folders = await response.json();

        foldersContainer.innerHTML = ''; 
        const folderNames = folders.map(folderObj => folderObj.folder);
        folderNames.forEach(folder => {
            const folderElement = document.createElement('div');
            folderElement.textContent = folder;
            folderElement.classList.add('folder');
            folderElement.addEventListener('click', () => displayFiles(folder));
            foldersContainer.appendChild(folderElement);
        });
    } catch (error) {
        console.error('Error fetching folders:', error);
    }
}
async function displayFiles(folderName) {
    try {
        const response = await fetch(`http://localhost:3000/files?folder=${folderName}`);
        const files = await response.json();

        filesContainer.innerHTML = '';
        const filesname = files.map(fileObj => fileObj.url);
        filesname.forEach(fileObj => {
            const fileName = fileObj.split('\\').slice(-1)[0]; // Extract file name from URL
            const fileElement = document.createElement('div');
            const fileLink = document.createElement('a');
            fileLink.href = fileObj;
            fileLink.target = "_blank"; // Open link in new tab
            fileElement.textContent = fileName;
            fileLink.appendChild(fileElement);
            fileLink.classList.add('file');
            filesContainer.appendChild(fileLink);
        });
    } catch (error) {
        console.error(`Error fetching files for folder ${folderName}:`, error);
    }
}

displayFolders();
