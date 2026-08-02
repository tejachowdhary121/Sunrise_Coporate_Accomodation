/*=========================================================
                    GALLERY FILTER
=========================================================*/

// const filterButtons =
// document.querySelectorAll(".filter-buttons button");

// const galleryItems =
// document.querySelectorAll(".gallery-item");

// const viewBtn =
// document.getElementById("viewMoreBtn");

let currentFilter = "all";
let expanded = false;

const galleryData = [

    {
        category: "building",
        title: "Exterior View",
        image: "img/gallery/building/building1.jpg"
    },

    {
        category: "building",
        title: "Main Entrance",
        image: "img/gallery/building/building2.jpg"
    },

    {
        category: "building",
        title: "Front View",
        image: "img/gallery/building/building3.jpg"
    },



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

    {
        category: "rooms",
        title: "Modern Interior",
        image: "img/gallery/rooms/room6.jpg"
    },



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
                GENERATE FILTERS
=========================================================*/

const filterContainer =
document.getElementById("filterButtons");

const categories = [

    "all",

    ...new Set(

        galleryData.map(item => item.category)

    )

];

const categoryNames = {

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

categories.forEach(category => {

    filterContainer.innerHTML += `

    <button

    class="${category==="all"?"active":""}"

    data-filter="${category}">

    <i class="bi ${categoryNames[category].icon}"></i>

    ${categoryNames[category].label}

    </button>

    `;

});


/*=========================================================
                GENERATE GALLERY
=========================================================*/

const galleryGrid =
document.getElementById("galleryGrid");

galleryData.forEach(photo=>{

galleryGrid.innerHTML+=`

<div

class="gallery-item"

data-category="${photo.category}">

<img

src="${photo.image}"

alt="${photo.title}"

loading="lazy">

<div class="gallery-overlay">

<span>

${photo.title}

</span>

</div>

</div>

`;

});

const filterButtons =
document.querySelectorAll(".filter-buttons button");

const galleryItems =
document.querySelectorAll(".gallery-item");

const viewBtn =
document.getElementById("viewMoreBtn");




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

        if (match) visibleItems.push(item);

    });

    visibleItems.forEach((item, index) => {

        if (expanded || index < 6) {

            item.style.display = "block";
            item.style.animation = "fadeIn .45s ease";

        }

    });

    if (visibleItems.length <= 6) {

        viewBtn.style.display = "none";

    } else {

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

        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        currentFilter = button.dataset.filter;

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
                    LIGHTBOX
=========================================================*/

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const caption = document.getElementById("imageCaption");
const counter = document.getElementById("imageCounter");

const loader = document.getElementById("loader");

const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev-image");
const nextBtn = document.querySelector(".next-image");

let currentImages = [];
let currentIndex = 0;

/*=========================================================
                    OPEN LIGHTBOX
=========================================================*/

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        if (item.style.display === "none") return;

        currentImages = [];

        galleryItems.forEach(image => {

            if (image.style.display !== "none") {

                currentImages.push(image);

            }

        });

        currentIndex = currentImages.indexOf(item);

        showImage();

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

/*=========================================================
                    SHOW IMAGE
=========================================================*/

function showImage() {

    loader.style.display = "block";

    lightboxImage.style.opacity = "0";

    const image =
        currentImages[currentIndex].querySelector("img");

    const text =
        currentImages[currentIndex]
        .querySelector(".gallery-overlay span")
        .innerText;

    lightboxImage.onload = () => {

        loader.style.display = "none";

        lightboxImage.style.opacity = "1";

    };

    lightboxImage.src = image.src;

    caption.innerText = text;

    counter.innerText =
        `${currentIndex + 1} / ${currentImages.length}`;

    preloadImages();

}

/*=========================================================
                PRELOAD IMAGES
=========================================================*/

function preloadImages() {

    let next = new Image();

    let prev = new Image();

    next.src =
        currentImages[
            (currentIndex + 1) %
            currentImages.length
        ]
            .querySelector("img").src;

    prev.src =
        currentImages[
            (currentIndex - 1 + currentImages.length) %
            currentImages.length
        ]
            .querySelector("img").src;

}

/*=========================================================
                IMAGE LOADING
=========================================================*/

document.querySelectorAll(".gallery-item img")

.forEach(img=>{

if(img.complete){

img.classList.add("loaded");

}

else{

img.onload=()=>{

img.classList.add("loaded");

}

}

});

/*=========================================================
                    NEXT IMAGE
=========================================================*/

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= currentImages.length)

        currentIndex = 0;

    lightboxImage.animate(

        [
            {
                opacity: .4,
                transform: "scale(.96)"
            },
            {
                opacity: 1,
                transform: "scale(1)"
            }
        ],

        {
            duration: 250,
            easing: "ease"
        }

    );

    showImage();

});

/*=========================================================
                PREVIOUS IMAGE
=========================================================*/

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0)

        currentIndex = currentImages.length - 1;

    lightboxImage.animate(

        [
            {
                opacity: .4,
                transform: "scale(.96)"
            },
            {
                opacity: 1,
                transform: "scale(1)"
            }
        ],

        {
            duration: 250,
            easing: "ease"
        }

    );

    showImage();

});

/*=========================================================
                    CLOSE
=========================================================*/

function closeLightbox() {

    lightbox.style.opacity = "0";

    setTimeout(() => {

        lightbox.classList.remove("show");

        lightbox.style.opacity = "";

        document.body.style.overflow = "auto";

    }, 200);

}

closeBtn.addEventListener("click", closeLightbox);

/*=========================================================
            CLICK OUTSIDE
=========================================================*/

lightbox.addEventListener("click", e => {

    if (e.target === lightbox)

        closeLightbox();

});

/*=========================================================
                KEYBOARD SUPPORT
=========================================================*/

document.addEventListener("keydown", e => {

    if (!lightbox.classList.contains("show"))

        return;

    if (e.key === "Escape")

        closeLightbox();

    if (e.key === "ArrowRight")

        nextBtn.click();

    if (e.key === "ArrowLeft")

        prevBtn.click();

});

/*=========================================================
                MOBILE SWIPE
=========================================================*/

let startX = 0;

lightbox.addEventListener("touchstart", e => {

    startX = e.touches[0].clientX;

});

lightbox.addEventListener("touchend", e => {

    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 60)

        nextBtn.click();

    if (endX - startX > 60)

        prevBtn.click();

});

/*=========================================================
                SCROLL PROGRESS
=========================================================*/

const progressBar =
document.querySelector(".scroll-progress");

window.addEventListener("scroll",()=>{

const scroll=

document.documentElement.scrollTop;

const height=

document.documentElement.scrollHeight-

document.documentElement.clientHeight;

const progress=

(scroll/height)*100;

progressBar.style.width=

progress+"%";

});

/*=========================================================
                BACK TO TOP
=========================================================*/

const topBtn=

document.getElementById("backTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.classList.add("show");

}

else{

topBtn.classList.remove("show");

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}