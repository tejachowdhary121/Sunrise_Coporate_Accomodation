/*======================================================================
    SUNRISE CORPORATE ACCOMMODATION
    APP.JS
    PART 1

    Sections
    ----------
    1. Global Settings
    2. Utility Functions
    3. Navbar
    4. Scroll To Top On Refresh
    5. Smooth Scrolling
    6. Image Lazy Animation
    7. Scroll Reveal Animation
    8. Sticky Navbar
    9. Active Navigation
    10. Back To Top
======================================================================*/

"use strict";

/*=========================================================
                GLOBAL SETTINGS
=========================================================*/

window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

/*=========================================================
                COMMON HELPERS
=========================================================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function exists(selector) {
    return document.querySelector(selector) !== null;
}

function debounce(func, delay = 100) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func(...args);

        }, delay);

    };

}

/*=========================================================
                IMAGE FADE
=========================================================*/

function initImageLoading() {

    $$("img").forEach(img => {

        if (img.complete) {

            img.classList.add("loaded");

        }

        else {

            img.onload = () => {

                img.classList.add("loaded");

            };

        }

    });

}

/*=========================================================
                SMOOTH SCROLL
=========================================================*/

function initSmoothScrolling() {

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

}

/*=========================================================
                STICKY NAVBAR
=========================================================*/

function initStickyNavbar() {

    const navbar = $(".navbar");

    if (!navbar) return;

    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        }

        else {

            navbar.classList.remove("navbar-scrolled");

        }

    }

    updateNavbar();

    window.addEventListener(

        "scroll",

        debounce(updateNavbar, 20)

    );

}

/* ========================================
   ACTIVE NAVIGATION LINK
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(".navbar .nav-link");

    let currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    // Fix for Netlify homepage
    if (currentPage === "" || currentPage === "/") {
        currentPage = "index.html";
    }

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage = href
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

});

/*=========================================================
                SCROLL REVEAL
=========================================================*/

function initRevealAnimations() {

    const sections = $$(
        ".welcome-section, .sharing-section, .living-section, .about-section, .gallery-section, .foodmenu-section"
    );

    if (!sections.length) return;

    function reveal() {

        const trigger = window.innerHeight * 0.85;

        sections.forEach(section => {

            if (

                section.getBoundingClientRect().top < trigger

            ) {

                section.classList.add("active");

            }

        });

    }

    reveal();

    window.addEventListener(

        "scroll",

        debounce(reveal, 20)

    );

}

/*=========================================================
                BACK TO TOP
=========================================================*/

function initBackToTop() {

    const button = $("#backTop");

    if (!button) return;

    function toggleButton() {

        if (window.scrollY > 400) {

            button.classList.add("show");

        }

        else {

            button.classList.remove("show");

        }

    }

    toggleButton();

    window.addEventListener(

        "scroll",

        debounce(toggleButton, 20)

    );

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================================
                SCROLL PROGRESS
=========================================================*/

function initScrollProgress() {

    const progress = $(".scroll-progress");

    if (!progress) return;

    function updateProgress() {

        const scroll =

            document.documentElement.scrollTop;

        const height =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const percentage =

            (scroll / height) * 100;

        progress.style.width = percentage + "%";

    }

    updateProgress();

    window.addEventListener(

        "scroll",

        debounce(updateProgress, 10)

    );

}

/*======================================================================
    APP.JS
    PART 2

    11. Home Page
    12. Room Sorting
    13. Room Modal
    14. Room Gallery
======================================================================*/

/*=========================================================
                ROOM SORTING
=========================================================*/

function initRoomSorting() {

    const container = document.getElementById("roomContainer");

    if (!container) return;

    window.sortRooms = function (type) {

        const wrappers = Array.from(
            container.querySelectorAll(".room-wrapper")
        );

        wrappers.sort((a, b) => {

            const cardA = a.querySelector(".room-card");
            const cardB = b.querySelector(".room-card");

            switch (type) {

                case "low":
                    return Number(cardA.dataset.price) -
                        Number(cardB.dataset.price);

                case "high":
                    return Number(cardB.dataset.price) -
                        Number(cardA.dataset.price);

                case "rating":
                    return Number(cardB.dataset.rating) -
                        Number(cardA.dataset.rating);

                case "popularity":
                    return Number(cardB.dataset.popularity) -
                        Number(cardA.dataset.popularity);

                default:
                    return 0;

            }

        });

        wrappers.forEach(card => container.appendChild(card));

    };

}

/*=========================================================
                ROOM MODAL DATA
=========================================================*/

const roomData = {

    four: {

        title: "Four Sharing",

        price: "₹8,000",

        description:
            "Affordable, spacious and fully ventilated four-sharing room with premium amenities and community living.",

        amenities: [

            ["img/assets/four.png", "4 Guests"],
            ["img/assets/bed.png", "4 Single Beds"],
            ["img/assets/wifi.png", "High-Speed WiFi"],
            ["img/assets/wardrobe.png", "4 Wardrobes"],
            ["img/assets/bathroom.png", "Bathroom"],
            ["img/assets/geyser.png", "Geyser"],
            ["img/assets/shoerack.png", "Shoe Rack"]

        ]

    },

    three: {

        title: "Three Sharing",

        price: "₹9,500",

        description:
            "Comfortable three-sharing room with modern interiors and premium facilities.",

        amenities: [

            ["img/assets/three.png", "3 Guests"],
            ["img/assets/bed.png", "3 Single Beds"],
            ["img/assets/wifi.png", "High-Speed WiFi"],
            ["img/assets/wardrobe.png", "3 Wardrobes"],
            ["img/assets/bathroom.png", "Bathroom"],
            ["img/assets/geyser.png", "Geyser"],
            ["img/assets/shoerack.png", "Shoe Rack"]

        ]

    },

    two: {

        title: "Two Sharing",

        price: "₹12,000",

        description:
            "Premium two-sharing accommodation ideal for working professionals.",

        amenities: [

            ["img/assets/two.png", "2 Guests"],
            ["img/assets/bed.png", "2 Single Beds"],
            ["img/assets/wifi.png", "High-Speed WiFi"],
            ["img/assets/wardrobe.png", "2 Wardrobes"],
            ["img/assets/geyser.png", "Geyser"],
            ["img/assets/bathroom.png", "Bathroom"],
            ["img/assets/shoerack.png", "Shoe Rack"],
            ["img/assets/workingdesk.png", "Work Desk with Chair"],

        ]

    },

    single: {

        title: "Single Sharing",

        price: "₹22,000",

        description:
            "Luxury private room offering complete privacy and premium comfort.",

        amenities: [

            ["img/assets/single.png", "1 Guest"],
            ["img/assets/queenbed.png", "Queen Bed"],
            ["img/assets/wifi.png", "High-Speed WiFi"],
            ["img/assets/wardrobe.png", "3 Wardrobes"],
            ["img/assets/geyser.png", "Geyser"],
            ["img/assets/bathroom.png", "Bathroom"],
            ["img/assets/shoerack.png", "Shoe Rack"],
            ["img/assets/workingdesk.png", "Work Desk with Chair"],

        ]

    }

};

/*=========================================================
                OPEN ROOM MODAL
=========================================================*/

window.openRoom = function (room) {

    if (!roomData[room]) return;

    const data = roomData[room];

    document.getElementById("modalRoomTitle").textContent =
        data.title;

    document.getElementById("modalPrice").textContent =
        data.price;

    document.getElementById("modalDescription").textContent =
        data.description;

    const container =
        document.getElementById("modalAmenities");

    container.innerHTML = "";

    data.amenities.forEach(item => {

        container.innerHTML += `

        <div class="modal-feature">

            <img src="${item[0]}" alt="${item[1]}">

            <span>${item[1]}</span>

        </div>

        `;

    });

    const modal =
        new bootstrap.Modal(
            document.getElementById("roomModal")
        );

    modal.show();

};

/*=========================================================
                CHANGE MODAL IMAGE
=========================================================*/

window.changeModalImage = function (src) {

    const image =
        document.getElementById("modalMainImage");

    if (!image) return;

    image.style.opacity = ".4";

    setTimeout(() => {

        image.src = src;

        image.onload = () => {

            image.style.opacity = "1";

        };

    }, 150);

};

/*=========================================================
                HOME CARD HOVER
=========================================================*/

function initHomeCards() {

    const cards = document.querySelectorAll(

        ".sharing-card,.feature-card,.room-card"

    );

    if (!cards.length) return;

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =

                "translateY(-8px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

}

/*=========================================================
                COUNTER ANIMATION
=========================================================*/

function animateCounter(counter) {

    const target =
        Number(counter.dataset.target);

    if (!target) return;

    let value = 0;

    const speed = target / 80;

    function update() {

        value += speed;

        if (value < target) {

            counter.innerHTML =
                Math.ceil(value);

            requestAnimationFrame(update);

        }

        else {

            counter.innerHTML = target;

        }

    }

    update();

}

function initCounters() {

    const counters =
        document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        }, {

            threshold: .4

        });

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

/*=========================================================
                BOOKING BUTTON EFFECT
=========================================================*/

function initBookingButtons() {

    document.querySelectorAll(

        ".btn-schedule,.booking-btn-call,.btn-whatsapp"

    ).forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform =
                "translateY(-4px)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}

/*======================================================================
    APP.JS
    PART 3.1

    15. Gallery Module
    - Gallery Data
    - Dynamic Filter Generation
    - Dynamic Gallery Generation
======================================================================*/

/*=========================================================
                    GALLERY DATA
=========================================================*/

const galleryData = [

    /*================ BUILDING ================*/

    {
        category: "building",
        title: "Exterior View",
        image: "img/gallery/rooms/room1.jpg"
    },

    {
        category: "building",
        title: "Main Entrance",
        image: "img/gallery/rooms/room2.jpg"
    },

    {
        category: "building",
        title: "Front View",
        image: "img/gallery/rooms/room3.jpg"
    },

    /*================ ROOMS ================*/

    {
        category: "rooms",
        title: "Single Sharing",
        image: "img/gallery/rooms/room1.jpg"
    },

    {
        category: "rooms",
        title: "Double Sharing",
        image: "img/gallery/rooms/room2.jpg"
    },

    {
        category: "rooms",
        title: "Triple Sharing",
        image: "img/gallery/rooms/room3.jpg"
    },

    {
        category: "rooms",
        title: "Premium Room",
        image: "img/gallery/rooms/room4.jpg"
    },

    {
        category: "rooms",
        title: "Luxury Room",
        image: "img/gallery/rooms/room5.jpg"
    },

    {
        category: "rooms",
        title: "Modern Interior",
        image: "img/gallery/rooms/room6.jpg"
    },

    /*================ BATHROOMS ================*/

    {
        category: "bathrooms",
        title: "Bathroom",
        image: "img/gallery/bathrooms/bath1.jpg"
    },

    {
        category: "bathrooms",
        title: "Premium Bathroom",
        image: "img/gallery/bathrooms/bath2.jpg"
    },

    /*================ DINING ================*/

    {
        category: "dining",
        title: "Dining Hall",
        image: "img/gallery/dining/dining1.jpg"
    },

    {
        category: "dining",
        title: "Buffet Area",
        image: "img/gallery/dining/dining2.jpg"
    },

    /*================ COMMON AREAS ================*/

    {
        category: "common",
        title: "Lounge",
        image: "img/gallery/lounge/lounge1.jpg"
    },

    {
        category: "common",
        title: "TV Area",
        image: "img/gallery/lounge/lounge2.jpg"
    },

    /*================ AMENITIES ================*/

    {
        category: "amenities",
        title: "Laundry",
        image: "img/gallery/amenities/laundry.jpg"
    },

    {
        category: "amenities",
        title: "High Speed WiFi",
        image: "img/gallery/amenities/wifi.jpg"
    },

    /*================ NEARBY ================*/

    {
        category: "nearby",
        title: "IT Park",
        image: "img/gallery/nearby/itpark.jpg"
    },

    {
        category: "nearby",
        title: "Metro",
        image: "img/gallery/nearby/metro.jpg"
    }

];

/*=========================================================
            GALLERY CATEGORY CONFIG
=========================================================*/

const galleryCategories = {

    all: {

        label: "All",

        icon: "bi-grid"

    },

    building: {

        label: "Building",

        icon: "bi-building"

    },

    rooms: {

        label: "Rooms",

        icon: "bi-door-open"

    },

    bathrooms: {

        label: "Bathrooms",

        icon: "bi-droplet"

    },

    dining: {

        label: "Dining",

        icon: "bi-cup-hot"

    },

    common: {

        label: "Common Areas",

        icon: "bi-people"

    },

    amenities: {

        label: "Amenities",

        icon: "bi-stars"

    },

    nearby: {

        label: "Nearby",

        icon: "bi-geo-alt"

    }

};

/*=========================================================
            INITIALIZE GALLERY
=========================================================*/

function initGallery() {

    const galleryGrid = $("#galleryGrid");

    const filterContainer = $("#filterButtons");

    const viewBtn = $("#viewMoreBtn");

    if (!galleryGrid || !filterContainer || !viewBtn)

        return;

    let currentFilter = "all";

    let expanded = false;

    /*=========================================
                CREATE FILTERS
    =========================================*/

    const categories = [

        "all",

        ...new Set(

            galleryData.map(

                item => item.category

            )

        )

    ];

    filterContainer.innerHTML = "";

    categories.forEach(category => {

        filterContainer.innerHTML += `

        <button

        class="${category==="all"?"active":""}"

        data-filter="${category}">

            <i class="bi ${galleryCategories[category].icon}"></i>

            ${galleryCategories[category].label}

        </button>

        `;

    });

    /*=========================================
            GENERATE GALLERY ITEMS
    =========================================*/

    galleryGrid.innerHTML = "";

    galleryData.forEach(photo => {

        galleryGrid.innerHTML += `

        <div

        class="gallery-item"

        data-category="${photo.category}">

            <img

            src="${photo.image}"

            alt="${photo.title}"

            loading="lazy">

            <div class="gallery-overlay">

                <span>${photo.title}</span>

            </div>

        </div>

        `;

    });

    const filterButtons =

        filterContainer.querySelectorAll("button");

    const galleryItems =

        galleryGrid.querySelectorAll(".gallery-item");

    /*=========================================================
                    UPDATE GALLERY
    =========================================================*/

    function updateGallery() {

        let visibleItems = [];

        galleryItems.forEach(item => {

            const match =

                currentFilter === "all" ||

                item.dataset.category === currentFilter;

            item.style.display = "none";

            if (match) {

                visibleItems.push(item);

            }

        });

        visibleItems.forEach((item, index) => {

            if (expanded || index < 6) {

                item.style.display = "block";

                item.style.animation =

                    "fadeIn .45s ease";

            }

        });

        if (visibleItems.length <= 6) {

            viewBtn.style.display = "none";

        }

        else {

            viewBtn.style.display = "inline-flex";

            viewBtn.innerHTML = expanded

                ? 'View Less <i class="bi bi-chevron-up"></i>'

                : 'View All Photos <i class="bi bi-chevron-down"></i>';

        }

    }

    /*=========================================================
                    FILTER BUTTONS
    =========================================================*/

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>

                btn.classList.remove("active")

            );

            button.classList.add("active");

            currentFilter =

                button.dataset.filter;

            expanded = false;

            updateGallery();

        });

    });

    /*=========================================================
                    VIEW ALL
    =========================================================*/

    viewBtn.addEventListener("click", () => {

        expanded = !expanded;

        updateGallery();

    });

    /*=========================================================
                    INITIAL LOAD
    =========================================================*/

    updateGallery();

    /*=========================================================
                    OPEN LIGHTBOX
    =========================================================*/

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            if (item.style.display === "none")

                return;

            currentImages = [];

            galleryItems.forEach(image => {

                if (image.style.display !== "none") {

                    currentImages.push(image);

                }

            });

            currentIndex =

                currentImages.indexOf(item);

            showGalleryImage();

            lightbox.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });

}

/*=========================================================
            GALLERY VARIABLES
=========================================================*/

let currentImages = [];

let currentIndex = 0;

const lightbox =

    document.getElementById("lightbox");

const lightboxImage =

    document.getElementById("lightboxImage");

const imageCaption =

    document.getElementById("imageCaption");

const imageCounter =

    document.getElementById("imageCounter");

const loader =

    document.getElementById("loader");

const prevBtn =

    document.querySelector(".prev-image");

const nextBtn =

    document.querySelector(".next-image");

const closeBtn =

    document.querySelector(".close-lightbox");


/*=========================================================
                SHOW GALLERY IMAGE
=========================================================*/

function showGalleryImage() {

    if (!currentImages.length) return;

    loader.style.display = "block";

    lightboxImage.style.opacity = "0";

    const image =
        currentImages[currentIndex]
            .querySelector("img");

    const title =
        currentImages[currentIndex]
            .querySelector(".gallery-overlay span")
            .textContent;

    lightboxImage.onload = () => {

        loader.style.display = "none";

        lightboxImage.style.opacity = "1";

    };

    lightboxImage.src = image.src;

    if (imageCaption)

        imageCaption.textContent = title;

    if (imageCounter)

        imageCounter.textContent =
            `${currentIndex + 1} / ${currentImages.length}`;

    preloadGalleryImages();

}

/*=========================================================
                PRELOAD IMAGES
=========================================================*/

function preloadGalleryImages() {

    if (currentImages.length < 2)

        return;

    const nextImage = new Image();

    const prevImage = new Image();

    nextImage.src =

        currentImages[

            (currentIndex + 1) %

            currentImages.length

        ]

        .querySelector("img")

        .src;

    prevImage.src =

        currentImages[

            (currentIndex - 1 +

            currentImages.length)

            %

            currentImages.length

        ]

        .querySelector("img")

        .src;

}

/*=========================================================
                NEXT IMAGE
=========================================================*/

if (nextBtn) {

    nextBtn.addEventListener(

        "click",

        () => {

            currentIndex++;

            if (

                currentIndex >=

                currentImages.length

            ) {

                currentIndex = 0;

            }

            lightboxImage.animate(

                [

                    {

                        opacity: .4,

                        transform:

                        "scale(.96)"

                    },

                    {

                        opacity: 1,

                        transform:

                        "scale(1)"

                    }

                ],

                {

                    duration: 250,

                    easing: "ease"

                }

            );

            showGalleryImage();

        }

    );

}

/*=========================================================
                PREVIOUS IMAGE
=========================================================*/

if (prevBtn) {

    prevBtn.addEventListener(

        "click",

        () => {

            currentIndex--;

            if (

                currentIndex < 0

            ) {

                currentIndex =

                    currentImages.length - 1;

            }

            lightboxImage.animate(

                [

                    {

                        opacity: .4,

                        transform:

                        "scale(.96)"

                    },

                    {

                        opacity: 1,

                        transform:

                        "scale(1)"

                    }

                ],

                {

                    duration: 250,

                    easing: "ease"

                }

            );

            showGalleryImage();

        }

    );

}

/*=========================================================
                CLOSE LIGHTBOX
=========================================================*/

function closeLightbox() {

    if (!lightbox)

        return;

    lightbox.style.opacity = "0";

    setTimeout(() => {

        lightbox.classList.remove("show");

        lightbox.style.opacity = "";

        document.body.style.overflow = "auto";

    }, 200);

}

if (closeBtn)

    closeBtn.addEventListener(

        "click",

        closeLightbox

    );

/*=========================================================
                CLICK OUTSIDE
=========================================================*/

if (lightbox) {

    lightbox.addEventListener(

        "click",

        e => {

            if (

                e.target === lightbox

            ) {

                closeLightbox();

            }

        }

    );

}

/*=========================================================
                KEYBOARD SUPPORT
=========================================================*/

document.addEventListener(

    "keydown",

    e => {

        if (

            !lightbox ||

            !lightbox.classList.contains("show")

        )

            return;

        if (

            e.key === "Escape"

        )

            closeLightbox();

        if (

            e.key === "ArrowRight"

        )

            nextBtn?.click();

        if (

            e.key === "ArrowLeft"

        )

            prevBtn?.click();

    }

);

/*=========================================================
                MOBILE SWIPE
=========================================================*/

if (lightbox) {

    let startX = 0;

    lightbox.addEventListener(

        "touchstart",

        e => {

            startX =

                e.touches[0].clientX;

        }

    );

    lightbox.addEventListener(

        "touchend",

        e => {

            const endX =

                e.changedTouches[0].clientX;

            if (

                startX - endX > 60

            )

                nextBtn?.click();

            if (

                endX - startX > 60

            )

                prevBtn?.click();

        }

    );

}

/*======================================================================
    APP.JS
    PART 4

    16. ABOUT PAGE
    - Review Slider
    - Auto Rotation
    - Pause On Hover
======================================================================*/

/*=========================================================
                REVIEW GROUPS
=========================================================*/

const reviewGroups = [

    /* BOX 1 */

    [
        {name:"Priya R.",text:"The rooms are spacious, clean and peaceful. The food tastes like home.",stars:"★★★★★"},
        {name:"Anjali S.",text:"Safe accommodation with excellent staff support.",stars:"★★★★★"},
        {name:"Divya K.",text:"Best PG near Financial District. WiFi is reliable.",stars:"★★★★★"},
        {name:"Sneha P.",text:"Very hygienic rooms and friendly management.",stars:"★★★★★"},
        {name:"Meghana",text:"Loved the housekeeping and security.",stars:"★★★★★"},
        {name:"Harini",text:"The atmosphere feels just like home.",stars:"★★★★★"},
        {name:"Keerthi",text:"Rooms are neat and comfortable.",stars:"★★★★☆"},
        {name:"Sravani",text:"Perfect place for working professionals.",stars:"★★★★★"},
        {name:"Bhavya",text:"Comfortable stay with delicious meals.",stars:"★★★★★"},
        {name:"Nandini",text:"Worth every rupee. Peaceful environment.",stars:"★★★★★"}
    ],

    /* BOX 2 */

    [
        {name:"Lakshmi",text:"Daily cleaning keeps the rooms fresh.",stars:"★★★★★"},
        {name:"Pavani",text:"Excellent location and transport access.",stars:"★★★★★"},
        {name:"Deepika",text:"Management responds quickly.",stars:"★★★★☆"},
        {name:"Vaishnavi",text:"Healthy food every day.",stars:"★★★★★"},
        {name:"Monika",text:"Spacious dining area.",stars:"★★★★★"},
        {name:"Aishwarya",text:"The building is well ventilated.",stars:"★★★★★"},
        {name:"Reshma",text:"Very safe for women.",stars:"★★★★★"},
        {name:"Sowmya",text:"Affordable and premium.",stars:"★★★★★"},
        {name:"Gayathri",text:"Peaceful atmosphere for work.",stars:"★★★★☆"},
        {name:"Ramya",text:"Great facilities for long stays.",stars:"★★★★★"}
    ],

    /* BOX 3 */

    [
        {name:"Pooja",text:"Excellent security and CCTV coverage.",stars:"★★★★★"},
        {name:"Bhargavi",text:"Lift and power backup are very useful.",stars:"★★★★★"},
        {name:"Kavya",text:"Maintenance team is supportive.",stars:"★★★★☆"},
        {name:"Sindhu",text:"The rooms receive plenty of sunlight.",stars:"★★★★★"},
        {name:"Ishwarya",text:"Loved staying here.",stars:"★★★★★"},
        {name:"Anusha",text:"Everything is well maintained.",stars:"★★★★★"},
        {name:"Swathi",text:"Comfortable beds.",stars:"★★★★★"},
        {name:"Nikita",text:"Very clean washrooms.",stars:"★★★★☆"},
        {name:"Jyothi",text:"Staff members are polite.",stars:"★★★★★"},
        {name:"Navya",text:"Feels safe at any time.",stars:"★★★★★"}
    ],

    /* BOX 4 */

    [
        {name:"Rashmi",text:"Quality food and good hygiene.",stars:"★★★★★"},
        {name:"Lavanya",text:"Neat surroundings.",stars:"★★★★★"},
        {name:"Aparna",text:"Fast maintenance service.",stars:"★★★★☆"},
        {name:"Chandana",text:"Highly recommended.",stars:"★★★★★"},
        {name:"Sushmitha",text:"Rooms are spacious.",stars:"★★★★★"},
        {name:"Krishna Priya",text:"Great experience overall.",stars:"★★★★★"},
        {name:"Siri",text:"Calm and quiet environment.",stars:"★★★★☆"},
        {name:"Hema",text:"Excellent housekeeping.",stars:"★★★★★"},
        {name:"Pallavi",text:"Everything needed is available.",stars:"★★★★★"},
        {name:"Renu",text:"Convenient location.",stars:"★★★★★"}
    ],

    /* BOX 5 */

    [
        {name:"Sirisha",text:"Healthy meals every day.",stars:"★★★★★"},
        {name:"Bindu",text:"Water supply is always available.",stars:"★★★★★"},
        {name:"Madhavi",text:"Very comfortable stay.",stars:"★★★★☆"},
        {name:"Soujanya",text:"Friendly residents.",stars:"★★★★★"},
        {name:"Alekhya",text:"Management is professional.",stars:"★★★★★"},
        {name:"Neelima",text:"Laundry area is clean.",stars:"★★★★★"},
        {name:"Rohini",text:"Value for money.",stars:"★★★★★"},
        {name:"Manasa",text:"Pleasant environment.",stars:"★★★★☆"},
        {name:"Akhila",text:"Food quality is impressive.",stars:"★★★★★"},
        {name:"Sandhya",text:"Would definitely recommend.",stars:"★★★★★"}
    ],

    /* BOX 6 */

    [
        {name:"Tejaswini",text:"Everything is organized well.",stars:"★★★★★"},
        {name:"Usha",text:"Good ventilation.",stars:"★★★★★"},
        {name:"Bhanu",text:"Excellent safety.",stars:"★★★★★"},
        {name:"Kiranmayi",text:"Very clean common areas.",stars:"★★★★☆"},
        {name:"Anupama",text:"Helpful caretakers.",stars:"★★★★★"},
        {name:"Durga",text:"Comfortable rooms.",stars:"★★★★★"},
        {name:"Rekha",text:"Great atmosphere.",stars:"★★★★★"},
        {name:"Padma",text:"Wonderful experience.",stars:"★★★★☆"},
        {name:"Niharika",text:"Loved the peaceful stay.",stars:"★★★★★"},
        {name:"Mounika",text:"Everything exceeded expectations.",stars:"★★★★★"}
    ],

    /* BOX 7 */

    [
        {name:"Anu",text:"Best choice near offices.",stars:"★★★★★"},
        {name:"Shilpa",text:"Very secure accommodation.",stars:"★★★★★"},
        {name:"Keerthana",text:"Clean corridors.",stars:"★★★★☆"},
        {name:"Madhuri",text:"Comfortable mattresses.",stars:"★★★★★"},
        {name:"Haritha",text:"Helpful staff.",stars:"★★★★★"},
        {name:"Nitya",text:"Reliable WiFi.",stars:"★★★★★"},
        {name:"Sailaja",text:"Excellent housekeeping.",stars:"★★★★★"},
        {name:"Triveni",text:"Modern amenities.",stars:"★★★★☆"},
        {name:"Prathyusha",text:"Highly satisfied.",stars:"★★★★★"},
        {name:"Anusha R.",text:"Feels like home.",stars:"★★★★★"}
    ],

    /* BOX 8 */

    [
        {name:"Kalyani",text:"Well maintained rooms.",stars:"★★★★★"},
        {name:"Swapna",text:"Nice ambience.",stars:"★★★★★"},
        {name:"Indu",text:"Great food quality.",stars:"★★★★☆"},
        {name:"Renuka",text:"Professional management.",stars:"★★★★★"},
        {name:"Mahalakshmi",text:"Always clean.",stars:"★★★★★"},
        {name:"Yamini",text:"Good security.",stars:"★★★★★"},
        {name:"Bhavana",text:"Convenient facilities.",stars:"★★★★★"},
        {name:"Sushma",text:"Affordable premium stay.",stars:"★★★★☆"},
        {name:"Tulasi",text:"Pleasant environment.",stars:"★★★★★"},
        {name:"Prasanna",text:"Very happy staying here.",stars:"★★★★★"}
    ],

    /* BOX 9 */

    [
        {name:"Sindhura",text:"Excellent accommodation.",stars:"★★★★★"},
        {name:"Harshitha",text:"Very peaceful place.",stars:"★★★★★"},
        {name:"Mouni",text:"Great management.",stars:"★★★★☆"},
        {name:"Vaidehi",text:"Clean and spacious.",stars:"★★★★★"},
        {name:"Shravya",text:"Nutritious meals.",stars:"★★★★★"},
        {name:"Siri L.",text:"Safe for women.",stars:"★★★★★"},
        {name:"Likitha",text:"Friendly atmosphere.",stars:"★★★★☆"},
        {name:"Anitha",text:"Excellent cleanliness.",stars:"★★★★★"},
        {name:"Kumari",text:"Loved the facilities.",stars:"★★★★★"},
        {name:"Rajeswari",text:"Five-star experience.",stars:"★★★★★"}
    ]

];

/*=========================================================
            INITIALIZE REVIEW SLIDER
=========================================================*/

function initReviewSlider(){

    reviewGroups.forEach((group,index)=>{

        const slider=document.getElementById(`review${index}`);

        if(!slider) return;

        let current=0;

        function showReview(){

            slider.classList.add("slide-out");

            setTimeout(()=>{

                const review=group[current];

                slider.innerHTML=`

                <div class="review-item">

                    <div class="stars">${review.stars}</div>

                    <p>"${review.text}"</p>

                    <h5>${review.name}</h5>

                </div>

                `;

                slider.classList.remove("slide-out");

                slider.classList.add("slide-up");

                setTimeout(()=>{

                    slider.classList.remove("slide-up");

                },700);

                current=(current+1)%group.length;

            },700);

        }

        showReview();

        let interval=setInterval(showReview,8000);

        slider.parentElement.addEventListener("mouseenter",()=>{

            clearInterval(interval);

        });

        slider.parentElement.addEventListener("mouseleave",()=>{

            interval=setInterval(showReview,8000);

        });

    });

}

/*======================================================================
    APP.JS
    PART 5

    17. FOOD MENU
======================================================================*/

/*=========================================================
                WEEKLY FOOD MENU
=========================================================*/

const weeklyMenu = {

    sunday:{

        title:"Sunday",

        specialDay:"🎉 Specials Day",

        breakfast:"Upma / Pongal, Chutney, Tea",

        lunch:"White Rice, Dal, Vegetable Curry, Rasam, Papad, Butter Milk",

        dinner:"Chicken Dum Biryani, Paneer Biryani, Raita",

        rasam:"Pepper Rasam",

        chutney:"Groundnut Chutney",

        pickle:"Mango Pickle / Tomato Pickle / Lemon Pickle",

        special:"Chicken Dum Biryani / Paneer Biryani"

    },

    monday:{

        title:"Monday",

        specialDay:"🥟 Pakoda Evening",

        breakfast:"Idli, Sambar, Chutney, Tea",

        lunch:"White Rice, Dal, Vegetable Curry, Rasam, Butter Milk",

        dinner:"Chapati, Chole Curry, White Rice, Sambar, Pakoda",

        rasam:"Tomato Rasam",

        chutney:"Peanut Chutney",

        pickle:"Mango Pickle / Tomato Pickle / Lemon Pickle",

        special:"Aloo / Onion Pakoda"

    },

    tuesday:{

        title:"Tuesday",

        specialDay:"🥚 Egg Special Dinner",

        breakfast:"Puri, Aloo Curry, Tea",

        lunch:"White Rice, Palak Dal, Vegetable Curry, Rasam",

        dinner:"Chapati, Egg Curry, White Rice, Sambar",

        rasam:"Garlic Rasam",

        chutney:"Tamarind Chutney",

        pickle:"Mango Pickle / Tomato Pickle / Lemon Pickle",

        special:"Egg Curry"

    },

    wednesday:{

        title:"Wednesday",

        specialDay:"🍗 Chicken / Paneer",

        breakfast:"Utappam, Dosa, Tea",

        lunch:"Jeera Rice, Dal Tadka, Butter Milk",

        dinner:"Chapati, Chicken Curry, Paneer Curry",

        rasam:"Tomato Rasam",

        chutney:"Peanut Chutney",

        pickle:"Mango Pickle / Tomato Pickle / Lemon Pickle",

        special:"Chicken Curry"

    },

    thursday:{

        title:"Thursday",

        specialDay:"🥘 Variety Chapati",

        breakfast:"Methi Chapati",

        lunch:"White Rice, Dal, Fry",

        dinner:"Chapati, Chenna Curry",

        rasam:"Pepper Rasam",

        chutney:"Mint Chutney",

        pickle:"Mango Pickle",

        special:"Ladies Finger Fry"

    },

    friday:{

        title:"Friday",

        specialDay:"🍗 Chicken Dinner",

        breakfast:"Punugulu / Mysore Bajji",

        lunch:"White Rice, Tomato Dal",

        dinner:"Chapati, Chicken Curry",

        rasam:"Tomato Rasam",

        chutney:"Groundnut Chutney",

        pickle:"Mixed Pickle",

        special:"Chicken Curry"

    },

    saturday:{

        title:"Saturday",

        specialDay:"🍲 Weekend Special",

        breakfast:"Poha, Lemon Rice",

        lunch:"Vegetable Pulav",

        dinner:"Dosa / Chole Bhature",

        rasam:"Tomato Rasam",

        chutney:"Groundnut Chutney",

        pickle:"Mixed Pickle",

        special:"Sweet"

    }

};

/*=========================================================
                UPDATE FOOD MENU
=========================================================*/

function updateMenu(day){

    if(!weeklyMenu[day]) return;

    const menu=weeklyMenu[day];

    const ids={

        dayTitle:menu.title,

        specialDay:menu.specialDay,

        breakfast:menu.breakfast,

        lunch:menu.lunch,

        dinner:menu.dinner,

        rasam:menu.rasam,

        chutney:menu.chutney,

        pickle:menu.pickle,

        special:menu.special

    };

    Object.entries(ids).forEach(([id,value])=>{

        const el=document.getElementById(id);

        if(el)

            el.textContent=value;

    });

}

/*=========================================================
            INITIALIZE FOOD MENU
=========================================================*/

function initFoodMenu(){

    const dayButtons=document.querySelectorAll(".day-btn");

    if(!dayButtons.length)

        return;

    dayButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            dayButtons.forEach(btn=>

                btn.classList.remove("active")

            );

            button.classList.add("active");

            updateMenu(button.dataset.day);

        });

    });

    const days=[

        "sunday",

        "monday",

        "tuesday",

        "wednesday",

        "thursday",

        "friday",

        "saturday"

    ];

    const today=

        days[new Date().getDay()];

    const active=

        document.querySelector(

            `[data-day="${today}"]`

        );

    if(active)

        active.click();

}

/*======================================================================
    APP.JS
    PART 6

    FINAL INITIALIZATION
======================================================================*/

/*=========================================================
                APP INITIALIZER
=========================================================*/

function initializeApplication(){

    /*=========================
            GLOBAL
    =========================*/

    initImageLoading();

    initSmoothScrolling();

    initStickyNavbar();

    initActiveNav();

    initRevealAnimations();

    initBackToTop();

    initScrollProgress();


    /*=========================
            HOME
    =========================*/

    initRoomSorting();

    initHomeCards();

    initCounters();

    initBookingButtons();


    /*=========================
            GALLERY
    =========================*/

    initGallery();


    /*=========================
            ABOUT
    =========================*/

    initReviewSlider();


    /*=========================
            FOOD MENU
    =========================*/

    initFoodMenu();

}

/*=========================================================
                PAGE READY
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);

/*=========================================================
            WINDOW LOAD
=========================================================*/

window.addEventListener(

    "load",

    () => {

        document.body.classList.add("loaded");

    }

);

/*=========================================================
            WINDOW RESIZE
=========================================================*/

window.addEventListener(

    "resize",

    debounce(() => {

        if(typeof updateGallery==="function"){

            updateGallery();

        }

    },150)

);

/*=========================================================
            VISIBILITY CHANGE
=========================================================*/

document.addEventListener(

    "visibilitychange",

    () => {

        if(document.hidden){

            document.body.classList.add("page-hidden");

        }

        else{

            document.body.classList.remove("page-hidden");

        }

    }

);

/*=========================================================
            ERROR HANDLER
=========================================================*/

window.addEventListener(

    "error",

    function(error){

        console.error(

            "Application Error:",

            error.message

        );

    }

);

/*=========================================================
            END OF APP.JS
=========================================================*/

console.log(

    "%cSunrise Corporate Accommodation",

    "color:#D4AF37;font-size:16px;font-weight:bold;"

);

console.log(

    "%cApplication Loaded Successfully",

    "color:#2ECC71;font-size:13px;"

);