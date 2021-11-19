import App from "../../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../../Router";
import Utils from "../../../Utils";
import { Graduates } from "../../../../static/data/graduateData";
import { LitElement } from 'lit-element';
import { AppFooter } from "../../../components/va-app-footer"


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
          <div class="column"> 
            <div class="avatarContainer">
            <!-- first graduate avatar image -->
              <img class="avatarStyling avatarImage avatarOne" src="/images/graduateBags/_DSC1411.jpg"/> 
             <!-- second graduate avatar image -->
              <img class="avatarStyling avatarImage avatarTwo" src="/images/graduateBags/_DSC1408.jpg"/> 
              </div> 
          </div>
          <div class="column paddingLeft">
            <h3>${student19760513[0].major}</h3>
            <h1>
              ${student19760513[0].firstName} ${student19760513[0].lastName}
            </h1>
            <p><i>${student19760513[0].tagLine}</i></p>

           

            <p><strong>About ${student19760513[0].firstName}: </strong></p>
            <p class="bioStyle">${student19760513[0].bio}</p>

            <a
              class="secondary" 
              href="${student19760513[0].portfolio}"
              target="_blank"

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
          </div>
        </section>

             <!-- WORK ---------------------------------->
             <section>
          <h2>Some of ${student19760513[0].firstName}'s Work</h2>
       
        <!--   <div class ="gridContainer"> -->
            <!-- This is where we will display a couple of the students best works. -->
            <!-- Maximum number is 6 works -->

            <div id="photos">
            <img class="portfolioItems" src="https://drive.google.com/uc?id=1DJcRLfvxPuNkxrFZ6VwBspKfWHB0sJOi" alt="Design one">
            <img class="portfolioItems" src="https://drive.google.com/uc?id=1jwDFyLbTgURYQYUPRE2MdrH-lHw9kqIC" alt="Design two">
            <img class="portfolioItems" src="https://drive.google.com/uc?id=1qTXOZjAKXGrRRVTFlQvMLK-7G9OQeapT" alt="Design three">
            <img class="portfolioItems" src="https://drive.google.com/uc?id=1o4GROQLgBxfGV94coqUtGdoQg8sWSdN5" alt="Design four">
            <img class="portfolioItems" src="https://drive.google.com/uc?id=12OP2sZ7n7C2niZhCidY5H95X5yjiPFXf" alt="Design five">
            <img class="portfolioItems" src="https://drive.google.com/uc?id=1dzYYjrJHe_maZUN--ffgrpSoUZGdvWxN" alt="Design six">
  </div>


      <!---    </div> --->
       
        </section>
   
        
      </div>
      <va-app-footer></va-app-footer>
    `;
    render(template, App.rootEl);
  }
}

export default new student19760513View();
