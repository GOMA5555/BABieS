const productOpen = document.getElementById("product-open");
const productClose = document.getElementById("product-close");
const productPopup = document.getElementById("product-popup");
const productTrack = document.getElementById("product-track");
const sliderDots = document.querySelectorAll(".slider-dot");
const productDetailItems = document.querySelectorAll(".product-detail-item");
const productImages = [
    "images/product-1.png",
    "images/product-2.png",
    "images/product-3.png",
    "images/product-4.png",
    "images/product-5.png",
];
const productSlideWidth = 340;

let productImageIndex = 0;
let productTimer;
let swipeStartX = 0;
let swipeEndX = 0;
let didSwipeProduct = false;

function moveProductTrack(index, useTransition = true) {
    productTrack.style.transition = useTransition ? "transform 0.45s ease-out" : "none";
    productTrack.style.transform = `translateX(-${index * productSlideWidth}px)`;
}

function updateProductDots(index) {
    const activeIndex = index % productImages.length;
    sliderDots.forEach((dot) => {
        dot.classList.toggle("is-active", Number(dot.dataset.slide) === activeIndex);
    });
}

function showNextProductImage() {
    productImageIndex += 1;
    moveProductTrack(productImageIndex);
    updateProductDots(productImageIndex);
}

function showPrevProductImage() {
    if (productImageIndex === 0) {
        productImageIndex = productImages.length;
        moveProductTrack(productImageIndex, false);
        void productTrack.offsetWidth;
    }

    productImageIndex -= 1;
    moveProductTrack(productImageIndex);
    updateProductDots(productImageIndex);
}

function restartProductSlider() {
    clearInterval(productTimer);
    productTimer = setInterval(showNextProductImage, 4000);
}

function moveProductBySwipe() {
    const swipeDistance = swipeEndX - swipeStartX;

    if (Math.abs(swipeDistance) < 40) {
        didSwipeProduct = false;
        return;
    }

    didSwipeProduct = true;

    if (swipeDistance < 0) {
        showNextProductImage();
    } else {
        showPrevProductImage();
    }

    restartProductSlider();
}

function openProductPopup() {
    if (didSwipeProduct) {
        didSwipeProduct = false;
        return;
    }

    productDetailItems.forEach((item) => {
        item.classList.toggle("is-active", Number(item.dataset.product) === productImageIndex % productImages.length);
    });
    productPopup.classList.add("is-open");
    productPopup.setAttribute("aria-hidden", "false");
}

function closeProductPopup() {
    productPopup.classList.remove("is-open");
    productPopup.setAttribute("aria-hidden", "true");
}

productOpen.addEventListener("click", openProductPopup);
productTrack.addEventListener("dragstart", (event) => {
    event.preventDefault();
});
productTrack.addEventListener("transitionend", () => {
    if (productImageIndex === productImages.length) {
        productImageIndex = 0;
        moveProductTrack(productImageIndex, false);
    }
});
productOpen.addEventListener("pointerdown", (event) => {
    swipeStartX = event.clientX;
});
productOpen.addEventListener("pointerup", (event) => {
    swipeEndX = event.clientX;
    moveProductBySwipe();
});
productClose.addEventListener("click", closeProductPopup);
sliderDots.forEach((dot) => {
    dot.addEventListener("click", () => {
        productImageIndex = Number(dot.dataset.slide);
        moveProductTrack(productImageIndex);
        updateProductDots(productImageIndex);
        restartProductSlider();
    });
});

productPopup.addEventListener("click", (event) => {
    if (event.target === productPopup) {
        closeProductPopup();
    }
});

restartProductSlider();

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProductPopup();
    }
});
