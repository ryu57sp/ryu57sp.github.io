document.addEventListener("alpine:init", () => {
  if (typeof window.Splide === "undefined") {
    console.error("Splide is not defined. Ensure vendors.js is loaded.");
    return;
  }

  window.Alpine.data("slider", () => ({
    sidebarOpen: false,
    activeSlide: 0,
    splide: null,

    isLastSlide() {
      return this.splide && this.splide.Components
        ? this.activeSlide === this.splide.Components.Controller.getEnd()
        : false;
    },

    init() {
      this.$nextTick(() => {
        const sliderEl = document.querySelector("#main-slider");
        if (!sliderEl) {
          console.error("Main slider element (#main-slider) not found in DOM");
          return;
        }

        this.splide = new window.Splide(sliderEl, {
          type: "slide",
          height: "100vh",
          speed: 2000,
          pagination: false,
          arrows: false,
          drag: false,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          start: 0,
        });

        this.splide.on("mounted", () => {
          this.activeSlide = this.splide.index;
        });

        this.splide.on("move", (newIndex) => {
          this.activeSlide = newIndex;
        });

        this.splide.on("active", (slide) => {});

        try {
          this.splide.mount();
        } catch (error) {
          console.error("Failed to mount Splide:", error);
        }
      });
    },

    goToSlide(index) {
      if (!this.splide) {
        console.error("Splide instance not initialized");
        return;
      }
      if (
        typeof index !== "number" ||
        index < 0 ||
        index > this.splide.Components.Controller.getEnd()
      ) {
        console.error(
          `Invalid slide index: ${index}. Valid range: 0 to ${this.splide.Components.Controller.getEnd()}`,
        );
        return;
      }
      this.splide.go(index);
      this.activeSlide = index;
      this.sidebarOpen = false;
    },
  }));
});
