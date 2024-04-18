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
