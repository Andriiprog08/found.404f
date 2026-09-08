const contentEl = document.getElementById('page-content');

async function loadPage(url,addToHistory = true) {

    contentEl.classList.add('fade-out');

    try{
        const res = await fetch(url);
        if (!res.ok) throw new Error('Page not found');
        const html = await res.text();

        await new Promise(r => setTimeout(r, 250));

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.getElementById('page-content');

        if (newContent){
            contentEl.className = newContent.className;
            contentEl.innerHTML = newContent.innerHTML;
        }

        document.title = doc.title;

        if (addToHistory){
            history.pushState({ url }, '', url);
        }

        contentEl.classList.remove('fade-out');
        contentEl.classList.add('fade-in');
        setTimeout(() => contentEl.classList.remove('fade-in'), 300);

        window.scrollTo(0, 0);
    } catch (err) {
        window.location.href = url;
    }
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const url = link.getAttribute('href');
    const isInternal = link.hostname === window.location.hostname;
    const isHtml = url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('http') || isInternal;

    if (isInternal && isHtml && link.target !== '_blank') {
        e.preventDefault();
        loadPage(url);
    }
});

window.addEventListener('popstate', (e) =>{
    loadPage(window.location.pathname, false);
});

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

(function () {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    function initCursor() {
        const target = document.getElementById('cursorTarget');

        if (!target) {
            return setTimeout(initCursor, 50);
        }

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let posX = mouseX;
        let posY = mouseY;
        const speed = 0.07;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animate() {
            posX += (mouseX - posX) * speed;
            posY += (mouseY - posY) * speed;
            target.style.transform = `translate(${posX}px, ${posY}px) translate(-50%, -50%)`;
            requestAnimationFrame(animate);
        }

        animate();
    }

    initCursor();

})();
