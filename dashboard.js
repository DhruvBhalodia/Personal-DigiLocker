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

function showTab(tabId) {
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function (tabContent) {
        tabContent.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function handleDropdownItemClick(action) {
    if (action === 'trash') {
        window.location.href = 'trash.html';
    }
    if (action == 'logout') {
        fetch('http://localhost:3000/logout')
        .then(response => {
            if(response.status < 300){
                window.location.href = 'index.html'
            }
        })
    }
}

