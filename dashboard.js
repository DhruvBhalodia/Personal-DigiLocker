document.addEventListener('click', function (event) {
    var dropdownMenu = document.getElementById("dropdown-menu");
    var userLogo = document.querySelector(".navbar-logo img");
    var targetElement = event.target;

    if (!dropdownMenu.contains(targetElement) && targetElement !== userLogo) {
        console.log("Closing dropdown menu");
        dropdownMenu.classList.remove("show");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const navbarTabs = document.querySelectorAll(".tab");

    navbarTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const activeTab = document.querySelector(".tab.active");
            activeTab.classList.remove("active");
            tab.classList.add("active");
        });
    });
});

function toggleDropdown() {
    var dropdownMenu = document.getElementById("dropdown-menu");
    dropdownMenu.classList.toggle("show");
}

function loadPage(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            document.getElementById('page-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading page:', error));
}

// Function to show the tab content based on its ID
function showTab(tabId) {
    // Get all tab content elements
    var tabContents = document.querySelectorAll('.tab-content');
    // Loop through each tab content element
    tabContents.forEach(function(tabContent) {
        // Hide all tab content elements
        tabContent.style.display = 'none';
    });
    // Show the tab content with the specified ID
    document.getElementById(tabId).style.display = 'block';
}
