import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Utils from "../../Utils";

class AboutView {
  init() {
    document.title = "About Page";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <va-app-header title="About page"></va-app-header>
      <div class="page-content">
        <section class="about-banner">
        
          <div class="about-landing">
            <h1>About Us</h1>
            <p>
            Join us at the DeStore Deli for the 2021 Curtin Grad Show!   
            Featuring employees from Animation & Game Design, Creative Advertising
            & Graphic Design and Digital Design, we're sure to serve up with best dishes and designs!<br /><br/>

            Of course, none of this would have been possible without the support of friends, families
            and the Graduates Staff Committee, so this ones for you - here's the culmination of all 
            hardwork and tears over the past couple years.
            </p>
          </div>

          <img src="https://drive.google.com/uc?export=view&id=1JxGAVQPoi8QiT08CvTJ3HCLaUbvSQoiu" class="about-img" />
        </section>

        <div class="values-logo">
          <div class="about-logo"></div>
          <h1>Our Values</h1>
        </div>

        <div class="values">
          <div class="value-1">
            <h4>Inclusivity</h4>
            <p>
              Providing equal access and opportunities to all members
              of the Grad Show, creating a safe space for people to contribute.
            </p>
          </div>
          <div class="value-2">
            <h4>Innovation</h4>
            <p>
              Always producing and designing new ideas, 
              creating advances in innovation and efficiency to
              be the best that we can be.
            </p>
          </div>
          <div class="value-3">
            <h4>Creativity</h4>
            <p>
             The ability to experiment, to value and learn from mistakes,
              and build on the experience. 
            </p>
          </div>
          <div class="value-4">
            <h4>Diversity</h4>
            <p>
              Recognising and respecting people of all ethnicity, gender,
              age, race, religion and sexual orientation - and 
              valuing their differences.
            </p>
          </div>
        </div>

        <div class="credit-logo">
          <div class="credits-logo"></div>
          <h1>Credits</h1>
        </div>

        <section class="block-100 credit-fill">
          <div class="credit-block" id="tres">
            <h3>Treasury</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Animation & Video Production Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Photography Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Testing & Quality Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Website Programmers</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Copy Writing Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Communications & Logistics Team</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>UI / UX Designers</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Social Media</h3>
            <ul>
              <li>Name LastName</li>
              <li>Name LastName</li>
              <li>Name LastName</li>
            </ul>
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

export default new AboutView();
