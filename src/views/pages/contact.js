import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Utils from "../../Utils";
import { Graduates } from "./../../../static/data/graduateData";

var agdGradsArray = Graduates.filter(function (grad) {
  return grad.major === "Animation and Game Design";
});

var digitalGradsArray = Graduates.filter(function (grad) {
  return grad.major === "Digital Experience and Interaction Design";
});

var graphicGradsArray = Graduates.filter(function (grad) {
  return grad.major === "Graphic Design";
});

Utils.shuffle(digitalGradsArray);

class ContactView {
  init() {
    document.title = "Playground Page";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <div
        style="display:flex; flex-direction:row; flex-flow:wrap; align-items:center; justify-content:center; width:80vw; margin: 0 auto"
      >
        ${digitalGradsArray.map(
          (graduate) => html`
            <div
              style="height:200px; width:auto; min-width:300px; background:white; margin:1rem; border-radius:15px; padding:1rem"
            >
              <h2>${graduate.firstName}</h2>
              <p>${graduate.tagLine}</p>
            </div>
          `
        )}
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new ContactView();
