// const images = document.querySelectorAll(".card img");

// images.forEach(img => {
//     img.addEventListener("click", () => {
//         img.classList.toggle("large");
//     });
// });

const galleryImages = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

galleryImages.forEach(image => {

    image.addEventListener("click", function(){

        lightbox.style.display = "flex";
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;

    });

});

closeBtn.addEventListener("click", function(){

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", function(e){

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});