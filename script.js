fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        const boxLinks= document.getElementById('box-links')
        const burgerBtn = document.getElementById('burgerBtn')
        const main = document.getElementById('main')
        
        burgerBtn.addEventListener('click', () => {
        boxLinks.classList.toggle('active');
        burgerBtn.classList.toggle('active');
        main.classList.toggle('blurred');
        });
        
        document.addEventListener('click', (e) => {
        const isMenuOpen = boxLinks.classList.contains('active');
        const clickedInsideMenu = boxLinks.contains(e.target);
        const clickedBurger = burgerBtn.contains(e.target);
        
        if (isMenuOpen && !clickedInsideMenu && !clickedBurger) {
            boxLinks.classList.remove('active');
            burgerBtn.classList.remove('active');
            main.classList.remove('blurred');
        }
        });
    });

