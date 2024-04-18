document.addEventListener('DOMContentLoaded', displayFiles);

async function displayFiles() {
    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get('folder');

    try {
        const response = await fetch(`http://localhost:3000/files?folder=${folderName}`);
        const files = await response.json();
        const filesContainer = document.getElementById('filesContainer');
        filesContainer.innerHTML = '';

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
