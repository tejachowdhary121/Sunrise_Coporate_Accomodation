function sortRooms(type) {

    console.log("Sort clicked:", type);

    const container = document.getElementById("roomContainer");
    console.log("Container:", container);

    const wrappers = Array.from(document.querySelectorAll(".room-wrapper"));
    console.log("Wrappers found:", wrappers.length);

    wrappers.sort((a, b) => {

        const cardA = a.querySelector(".room-card");
        const cardB = b.querySelector(".room-card");

        console.log(cardA, cardB);

        if (type === "low")
            return Number(cardA.dataset.price) - Number(cardB.dataset.price);

        if (type === "high")
            return Number(cardB.dataset.price) - Number(cardA.dataset.price);

        if (type === "rating")
            return Number(cardB.dataset.rating) - Number(cardA.dataset.rating);

        if (type === "popularity")
            return Number(cardB.dataset.popularity) - Number(cardA.dataset.popularity);

        return 0;
    });

    wrappers.forEach(wrapper => container.appendChild(wrapper));
}


// =========================================
// WEEKLY MENU DATA
// =========================================

const weeklyMenu = {

    sunday: {
        title: "Sunday",
        specialDay: "🎉 Specials Day",

        breakfast: "Upma / Pongal, Chutney, Tea",

        lunch: "White Rice, Dal, Vegetable Curry, Rasam, Papad, Butter Milk",

        dinner: "Chicken Dum Biryani, Paneer Biryani, Raita",

        rasam: "Pepper Rasam",

        chutney: "Groundnut Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Chicken Dum Biryani / Paneer Biryani"
    },

    monday: {

        title: "Monday",
        specialDay: "🥟 Pakoda Evening",

        breakfast: "Idli, Sambar, Chutney, Tea",

        lunch: "WhiteRice, Dal, Vegetable Curry, Rasam, Butter Milk",

        dinner: "Chapati, Chole Curry, White Rice, Sambar, Pakoda",

        rasam: "Tomato Rasam",

        chutney: "Peanut Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Aloo / Onion Pakoda"

    },

    tuesday: {

        title: "Tuesday",
        specialDay: "🥚 Egg Special Dinner",

        breakfast: "Puri, Aloo Curry, Tea",

        lunch: "White Rice, Palak / Methi Dal, Vegetable Curry, Rasam, Butter Milk",

        dinner: "Chapati*, Boiled Egg / Egg Bhurji / Omlette, White Rice, Sambar",

        rasam: "Garlic Rasam",

        chutney: "Tamarind Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Boiled Egg / Egg Bhurji / Omlette"

    },

    wednesday: {

        title: "Wednesday",
        specialDay: "🍗 Chicken / Paneer Dinner",

        breakfast: "Utappam, Dosa, Chutney, Tea",

        lunch: "Jeera Rice / Tomato Rice / Pudhina Rice, Dal Tadka, Butter Milk",

        dinner: "Chapati, Chicken Curry, Paneer Curry, White Rice, Sambar",

        rasam: "Tomato Rasam",

        chutney: "Peanut Chutney, Ginger Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Chicken Curry, Paneer Curry"

    },

    thursday: {

        title: "Thursday",
        specialDay: " 🥘 Variety of Chapathis",

        breakfast: "Methi Chapathi, Chutney, Tea",

        lunch: "White Rice, Palak / Methi Dal, Vegetable Curry, Rasam, Butter Milk",

        dinner: "Chapathi, Chenna Curry, White Rice, Sambar, Fry",

        rasam: "Pepper Rasam",

        chutney: "Mint Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Methi Chapathi, Ladies Finger Fry"

    },

    friday: {

        title: "Friday",
        specialDay: "🍗 Chicken / Paneer Dinner",

        breakfast: "Punugulu / Mysore Bajji, Chutney",

        lunch: "White Rice, Tomato Dal, Rasam, Vegetable Curry, Butter Milk",

        dinner: "Chapati, Chicken Curry, Paneer Curry, White Rice, Sambar",

        rasam: "Tomato Rasam",

        chutney: "Groundnut Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Chicken Curry, Paneer Curry"

    },

    saturday: {

        title: "Saturday",
        specialDay: "🍲 Special Dinner",

        breakfast: "Poha, Lemon Rice, Chilli Powders",

        lunch: "Green Peas Pulav Rice / Vegetable Pulav, Tomato Sherva, Raita",

        dinner: "Dosa (Plain, Masala, Podi, Onion) / Chole Bhature, Chutney, Curd Rice, Sweet",

        rasam: "Tomato Rasam",

        chutney: "Groundnut Chutney",

        pickle: "Mango Pickle / Tomato Pickle / Lemon Pickle",

        special: "Sweet / Dessert"

    }

};

// ==========================================
// FOOD MENU FUNCTIONALITY
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // Exit if this isn't the Food Menu page
    if (!document.getElementById("dayTitle")) return;

    const dayButtons = document.querySelectorAll(".day-btn");
    const menuCard = document.querySelector(".menu-card");
    const notesCard = document.querySelector(".notes-card");

    // -------------------------
    // Update Menu
    // -------------------------

    function updateMenu(day) {

        const menu = weeklyMenu[day];

        if (!menu) return;

        // Add animation
        menuCard.classList.remove("fade-menu");
        notesCard.classList.remove("fade-menu");

        void menuCard.offsetWidth;

        menuCard.classList.add("fade-menu");
        notesCard.classList.add("fade-menu");

        // Heading
        document.getElementById("dayTitle").textContent = menu.title;

        document.getElementById("specialDay").textContent =
            menu.specialDay || "";

        // Meals
        document.getElementById("breakfast").textContent =
            menu.breakfast;

        document.getElementById("lunch").textContent =
            menu.lunch;

        document.getElementById("dinner").textContent =
            menu.dinner;

        // Notes
        document.getElementById("rasam").textContent =
            menu.rasam;

        document.getElementById("chutney").textContent =
            menu.chutney;

        document.getElementById("pickle").textContent =
            menu.pickle;

        document.getElementById("special").textContent =
            menu.special;

    }

    // -------------------------
    // Day Button Click
    // -------------------------

    dayButtons.forEach(button => {

        button.addEventListener("click", function () {

            dayButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            updateMenu(this.dataset.day);

        });

    });

    // -------------------------
    // Highlight Today's Day
    // -------------------------

    const todayIndex = new Date().getDay();

    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    const today = days[todayIndex];

    dayButtons.forEach(btn => {

        btn.classList.remove("active");

        if (btn.dataset.day === today) {
            btn.classList.add("active");
        }

    });

    updateMenu(today);

});

function changeModalImage(src){

document.getElementById("modalMainImage").src=src;

}

function openRoom(room){

const data={

four:{

title:"Four Sharing",

price:"8,000",

description:"Affordable, spacious and fully ventilated four-sharing room with premium amenities and community living.",

amenities:[

["img/assets/four.png","4 Guests"],

["img/assets/bed.png","4 Beds"],

["img/assets/wifi.png","High-Speed WiFi"],

["img/assets/geyser.png","Geyser"],

["img/assets/wardrobe.png","Wardrobes"],

["img/assets/bathroom.png","Bathroom"]

]

},

three:{

title:"Three Sharing",

price:"9,500",

description:"Comfortable three-sharing room with modern interiors and premium facilities.",

amenities:[

["img/assets/three.png","3 Guests"],

["img/assets/bed.png","3 Beds"],

["img/assets/wifi.png","WiFi"],

["img/assets/geyser.png","Geyser"],

["img/assets/wardrobe.png","Wardrobes"],

["img/assets/bathroom.png","Bathroom"]

]

},

two:{

title:"Two Sharing",

price:"12,000",

description:"Premium two-sharing accommodation ideal for working professionals.",

amenities:[

["img/assets/two.png","2 Guests"],

["img/assets/bed.png","2 Beds"],

["img/assets/workingdesk.png","Study Desk"],

["img/assets/wifi.png","WiFi"],

["img/assets/geyser.png","Geyser"],

["img/assets/bathroom.png","Bathroom"]

]

},

single:{

title:"Single Sharing",

price:"22,000",

description:"Luxury private room offering complete privacy and premium comfort.",

amenities:[

["img/assets/single.png","1 Guest"],

["img/assets/queenbed.png","Queen Bed"],

["img/assets/workingdesk.png","Study Desk"],

["img/assets/wifi.png","WiFi"],

["img/assets/geyser.png","Geyser"],

["img/assets/bathroom.png","Bathroom"]

]

}

};

document.getElementById("modalRoomTitle").innerHTML=data[room].title;

document.getElementById("modalPrice").innerHTML=data[room].price;

document.getElementById("modalDescription").innerHTML=data[room].description;

let html="";

data[room].amenities.forEach(function(a){

html+=`
<div class="modal-feature">

<img src="${a[0]}">

<span>${a[1]}</span>

</div>
`;

});

document.getElementById("modalAmenities").innerHTML=html;

new bootstrap.Modal(document.getElementById("roomModal")).show();

}

// ==============================================
// HOME PAGE ANIMATION
// ==============================================

window.addEventListener("load", () => {

    const sections = document.querySelectorAll(
        ".welcome-section, .sharing-section, .living-section"
    );

    if (!sections.length) return;

    const revealSections = () => {

        sections.forEach(section => {

            const trigger = window.innerHeight * 0.85;

            if (section.getBoundingClientRect().top < trigger) {

                section.classList.add("active");

            }

        });

    };

    revealSections();

    window.addEventListener("scroll", revealSections);

});

/*=========================================================
                IMAGE FADE
=========================================================*/

document.querySelectorAll("img").forEach(img=>{

    if(img.complete){

        img.classList.add("loaded");

    }else{

        img.onload=()=>img.classList.add("loaded");

    }

});