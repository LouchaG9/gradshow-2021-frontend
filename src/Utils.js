import gsap from "gsap";
import { Graduates } from "./../static/data/graduateData";

class Utils {
  isMobile() {
    let viewportWidth = window.innerWidth;
    if (viewportWidth <= 768) {
      return true;
    } else {
      return false;
    }
  }

  imageSplice(splitString) {
    Graduates.map((grad) => {
      const imageString = grad.images;
      const splitString = imageString.split(", ");
      return splitString;
      console.log(splitString);
    });
  }

  pageIntroAnim() {
    const pageContent = document.querySelector(".page-content");
    if (!pageContent) return;
    gsap.fromTo(
      pageContent,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 }
    );
  }
}

export default new Utils();
