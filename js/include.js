async function loadComponent(id, file) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function initializePage() {

    await loadComponent("navbar", "components/navbar.html");
    await loadComponent("footer", "components/footer.html");

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }

    });

}

initializePage();