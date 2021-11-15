import App from "../../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../../Router";
import Utils from "../../../Utils";
import { Graduates } from "../../../../static/data/graduateData";

let student19760513 = Graduates.filter((grad) => {
  return grad.studentNumber === "19760513";
});

console.log(student19760513);

class student19760513View {
  init() {
    document.title = "Brooke Fanto";
    this.render();
    console.log(Graduates);
  }

  render() {
    const template = html`
      <va-app-header title="View Graduate"></va-app-header>
      <div class="page-content">
        <section class="block-50-50">
          <div class="column"></div>
          <div class="column">
            <h3>${student19760513[0].major}</h3>
            <h1>
              ${student19760513[0].firstName} ${student19760513[0].lastName}
            </h1>
            <p>${student19760513[0].tagLine}</p>

            <a
              class="secondary"
              href="${student19760513[0].portfolio}"
              target="_blank"
              class="secondary"
            >
              Portfolio
            </a>
            <div class="socials-wrapper">
              <a
                class="icon"
                href="${student19760513[0].linkedin}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a
                class="icon"
                href="${student19760513[0].instagram}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-instagram"></i>
              </a>
              <a
                class="icon"
                href="${student19760513[0].dribbble}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-dribbble"></i>
              </a>
              <a
                class="icon"
                href="${student19760513[0].artStation}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-artstation"></i>
              </a>
              <a
                class="icon"
                href="${student19760513[0].behance}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-behance"></i>
              </a>
              <a
                class="icon"
                href="${student19760513[0].twitter}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                class="icon"
                href="${student19760513[0].vimeo}"
                target="_blank"
                class="secondary"
              >
                <i class="fab fa-vimeo-v"></i>
              </a>
            </div>

            <p><strong>Description</strong></p>
            <p>${student19760513[0].bio}</p>
          </div>
        </section>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new student19760513View();
