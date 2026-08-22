fetch('bg-grid.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('bg-placeholder').innerHTML = data;
    });

fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

         const burgerBtn = document.getElementById('burgerBtn');
        const currentPage = window.location.pathname.split('/').pop(); // например "menu.html" или "index.html"

        if (currentPage === 'menu.html') {
        burgerBtn.href = 'index.html';
        burgerBtn.classList.add('active');
        } else {
        burgerBtn.href = 'menu.html';
        burgerBtn.classList.remove('active');
        }
    });

