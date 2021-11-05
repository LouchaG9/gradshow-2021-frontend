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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              suspendisse non, sit euismod mauris ut. Suscipit non elit at sem
              massa eget semper. Eget tristique adipiscing congue turpis
              tincidunt non. Commodo tortor nunc lacus lacinia amet, platea. Ut
              nec leo, lobortis mattis. Tristique molestie orci nec nulla
              dapibus ultricies vel cursus. Eget dictumst volutpat integer eu,
              suscipit tincidunt gravida aliquam ultricies.<br /><br />
              Pretium parturient a, integer eget aenean vel. Diam commodo,
              pellentesque purus pretium, nisi nunc nisi tempus, tellus. Amet
              suspendisse sodales tristique purus. Netus est quam neque arcu
              elit aliquam. Tristique vulputate sed a in morbi. Enim, adipiscing
              a purus enim curabitur nunc, ac. Non, eu cursus arcu ut eu, ut
            </p>
          </div>

          <img src="https://i.stack.imgur.com/y9DpT.jpg" class="about-img" />
        </section>

        <section class="values-logo">
          <div class="about-logo"></div>
          <h1>Our Values</h1>
        </section>

        <section class="values">
          <div class="value-1">
            <h4>Value 1</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              suspendisse non, sit euismod. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Tellus suspendisse non, sit euismod.
            </p>
          </div>
          <div class="value-2">
            <h4>Value 1</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              suspendisse non, sit euismod. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Tellus suspendisse non, sit euismod.
            </p>
          </div>
          <div class="value-3">
            <h4>Value 1</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              suspendisse non, sit euismod. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Tellus suspendisse non, sit euismod.
            </p>
          </div>
          <div class="value-4">
            <h4>Value 1</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              suspendisse non, sit euismod. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Tellus suspendisse non, sit euismod.
            </p>
          </div>
        </section>

        <section class="block-100 credit-fill">
          <div class="credit-block">
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
      <section class="image-slider">
        <div class="slick kitten1"></div>
        <div class="slick kitten2"></div>
        <div class="slick kitten3"></div>
        <div class="slick kitten4"></div>
        <div class="slick kitten5"></div>
        <div class="slick kitten6"></div>
        <div class="slick kitten7"></div>
      </section>
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
