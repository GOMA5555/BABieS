const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const menuLinks = document.querySelectorAll(".menu a");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/* MENU CLOSE */

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

/* POPUP */

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const closePopup = document.getElementById("closePopup");

const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {

  const openPopup = () => {

    popupTitle.textContent = card.dataset.title;
    popupText.textContent = card.dataset.text;

    popup.classList.add("active");
  };

  card.addEventListener("click", openPopup);
  card.addEventListener("touchstart", openPopup, {
    passive:true
  });

});

closePopup.addEventListener("click", () => {
  popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
  if(e.target === popup){
    popup.classList.remove("active");
  }
});

/* AUTO SLIDE */

const slides = document.querySelector(".slides");
const cards = document.querySelectorAll(".product-card");

let currentIndex = 0;

function autoSlide(){

  currentIndex++;

  if(currentIndex >= cards.length){
    currentIndex = 0;
  }

  const cardWidth = cards[0].offsetWidth + 20;

  slides.scrollTo({
    left:cardWidth * currentIndex,
    behavior:"smooth"
  });

}

setInterval(autoSlide, 3000);