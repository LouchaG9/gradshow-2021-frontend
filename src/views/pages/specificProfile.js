import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";
import GraduateAPI from "./../../GraduateAPI";
import { Graduates } from "./../../../static/data/graduateData";
import graduates from "./graduates";

class specificProfile {
  async init() {
    document.title = "View Graduate";
    this.graduate = null;
    this.studentId = null;
    this.studentIdString = null;
    let graduates = Graduates;
    console.log(Graduates);
    Utils.pageIntroAnim();
    this.handleScrollTop();
    await this.getGraduate();
  }

  handleScrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  async getGraduate() {
    // get id param from URL
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");
    console.log(id);
    // get the graduate
    let studentId = Graduates.filter((grad) => {
      return grad.studentNumber === id;
    });
    console.log(studentId);
    const studentIdString = JSON.stringify(studentId);
    console.log(studentIdString);
    window.firstName = studentId[0].firstName;
    window.studentIdGlobal = studentId[0];
    console.log(firstName);
    this.render();
  }

  render() {
    const template = html`
      <va-app-header title="View Graduate"></va-app-header>
      <div class="page-content">
        <section class="block-50-50">
          <div class="column">
            <div class="avatarContainer">
              <!-- first graduate avatar image -->
              <img
                class="avatarStyling avatarImage avatarOne"
                src="../${globalThis.studentIdGlobal.avatarOne}"
              />
              <!-- second graduate avatar image -->
              <img
                class="avatarStyling avatarImage avatarTwo"
                src="../${globalThis.studentIdGlobal.avatarTwo}"
              />
            </div>
          </div>
          <div class="column paddingLeft">
            <h3>${globalThis.studentIdGlobal.major}</h3>
            <h1>
              ${globalThis.studentIdGlobal.firstName}
              ${globalThis.studentIdGlobal.lastName}
            </h1>
            <p><i>${globalThis.studentIdGlobal.tagLine}</i></p>

            <p class="bioStyle">${globalThis.studentIdGlobal.bio}</p>

            <div class="socials-wrapper">
              <a
                class="secondary"
                href="${globalThis.studentIdGlobal.portfolio}"
                target="_blank"
              >
                Portfolio
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.linkedin}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.instagram}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.dribbble}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-dribbble"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.artStation}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-artstation"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.behance}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-behance"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.twitter}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.vimeo}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-vimeo-v"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.github}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-github"></i>
              </a>
              <a
                class="icon"
                href="${globalThis.studentIdGlobal.shirt}"
                target="_blank"
                class="secondary"
              >
                <i class="fas fa-tshirt"></i>
              </a>
            </div>
          </div>
        </section>

        <!-- WORK ---------------------------------->
        <section>
          <h2 class="profile">
            Some of ${globalThis.studentIdGlobal.firstName}'s Work
          </h2>
          <!-- This is where we will display a couple of the students best works. -->
          <!-- Maximum number is 6 works -->

          <div id="photos">
            <img
              class="portfolioItems"
              src="${globalThis.studentIdGlobal.imageOne}"
              alt=""
            />
            <img
              class="portfolioItems"
              src="${globalThis.studentIdGlobal.imageTwo}"
              alt=""
            />
            <img
              class="portfolioItems"
              src="${globalThis.studentIdGlobal.imageThree}"
              alt=""
            />
            <img
              class="portfolioItems"
              src="${globalThis.studentIdGlobal.imageFour}"
              alt=""
            />
            <img
              class="portfolioItems"
              src="${globalThis.studentIdGlobal.imageFive}"
              alt=""
            />
            <img
              class="portfolioItems"
              src="${globalThis.studentIdGlobal.imageSix}"
              alt=""
            />
          </div>
        </section>
      </div>
      <footer>
        <div class="footer-content">
          <div class="destore-col">
            <h3>DeStore</h3>
            <p>
              Monday - Closed <br />
              Tuesday – Saturday: 7:00 am – 3:00 pm <br />
              Sunday: 9:00 am – 2:00 pm<br />
              Kent St, Bentley, 6102, Western Australia<br /><br />
              @destore
            </p>
          </div>
          <div class="major-col">
            <div
              class="footer-animation-column"
              @click="${() => gotoRoute("/graduates")}"
            >
              <div class="footer-item">
                <h3>Animation</h3>
              </div>
              <div class="footer-item">
                <h3>Game Design</h3>
              </div>
              <div class="footer-item">
                <h3>Fruit</h3>
              </div>
              <div class="footer-item">
                <h3>Vegetables</h3>
              </div>
            </div>
          </div>
          <div class="major-col">
            <div
              class="footer-digex-column"
              @click="${() => gotoRoute("/graduates")}"
            >
              <div class="footer-item">
                <h3>Digital Design</h3>
              </div>
              <div class="footer-item">
                <h3>Baked Goods</h3>
              </div>
              <div class="footer-item">
                <h3>Fresh Bread</h3>
              </div>
              <div class="footer-item">
                <h3>Wraps</h3>
              </div>
            </div>
          </div>
          <div class="major-col">
            <div
              class="footer-graphic-column"
              @click="${() => gotoRoute("/graduates")}"
            >
              <div class="footer-item">
                <h3>Graphic Design</h3>
              </div>
              <div class="footer-item">
                <h3>Cold Meats</h3>
              </div>
              <div class="footer-item">
                <h3>Cheese</h3>
              </div>
              <div class="footer-item">
                <h3>Olives</h3>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
    render(template, App.rootEl);
  }
}

export default new specificProfile();
