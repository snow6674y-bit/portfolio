const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxStatus = lightbox.querySelector(".lightbox-status");
const previousButton = lightbox.querySelector(".lightbox-prev");
const nextButton = lightbox.querySelector(".lightbox-next");
const closeButton = lightbox.querySelector(".lightbox-close");

let currentGallery = [];
let currentIndex = 0;

function renderImage() {
  const currentImage = currentGallery[currentIndex];
  const hasMultipleImages = currentGallery.length > 1;

  lightboxImage.src = currentImage.src;
  lightboxImage.alt = currentImage.alt;
  lightboxStatus.textContent = hasMultipleImages
    ? `${currentIndex + 1} / ${currentGallery.length}`
    : currentImage.alt;
  previousButton.hidden = !hasMultipleImages;
  nextButton.hidden = !hasMultipleImages;
}

function changeImage(direction) {
  currentIndex =
    (currentIndex + direction + currentGallery.length) % currentGallery.length;
  renderImage();
}

document.querySelectorAll(".project-list figure").forEach((figure) => {
  const links = [...figure.querySelectorAll("a[href]")];
  const gallery = links.map((link) => {
    const image = link.querySelector("img");

    return {
      src: link.href,
      alt: image.alt,
    };
  });

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      currentGallery = gallery;
      currentIndex = index;
      renderImage();
      lightbox.showModal();
    });
  });
});

previousButton.addEventListener("click", () => changeImage(-1));
nextButton.addEventListener("click", () => changeImage(1));
closeButton.addEventListener("click", () => lightbox.close());

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && currentGallery.length > 1) {
    changeImage(-1);
  }

  if (event.key === "ArrowRight" && currentGallery.length > 1) {
    changeImage(1);
  }
});
