function initializeLightbox() {
  if (typeof window.GLightbox === "undefined") {
    setTimeout(initializeLightbox, 100);
    return;
  }

  const lightbox = window.GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
  });

  setGrid(".underwater-grid");
  setGrid(".landscape-grid");
  setGrid(".portrait-grid");
}

document.addEventListener("DOMContentLoaded", () => {
  initializeLightbox();
});

/**
 * グリッド設定関数
 *
 * @param {string} class_name
 * @returns
 */
function setGrid(class_name) {
  const grid = document.querySelector(class_name);
  if (grid) {
    if (typeof window.imagesLoaded === "undefined") {
      return;
    }
    window.imagesLoaded(grid, () => {
      grid.style.columnCount =
        window.innerWidth >= 1280
          ? 4
          : window.innerWidth >= 1024
          ? 4
          : window.innerWidth >= 640
          ? 3
          : 2;
    });
  }
}
