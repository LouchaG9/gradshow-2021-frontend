import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Utils from "./../../Utils";

class HomeView {
  init() {
    console.log("HomeView.init");
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <va-app-header title="Home"></va-app-header>

      <div class="page-content">
        <section class="banner">
          <div class="left">
            <h2 class="subheading">
              organic grad show handcrafted by curtin design students
            </h2>
            <button
              class="shop-graduates-btn"
              @click="${() => gotoRoute("/graduates")}"
            >
              Shop all graduates
            </button>
          </div>
          <div class="right"></div>
        </section>

        <section class="majors">
          <div class="major-columns">
            <div
              class="animation-column"
              @click="${() => gotoRoute("/graduates")}"
            >
              <img src="#" alt="animation basket" />
              <div class="sign-item">
                <h3>Animation</h3>
              </div>
              <div class="sign-item">
                <h3>Game Design</h3>
              </div>
              <div class="sign-item">
                <h3>Fruit</h3>
              </div>
              <div class="sign-item">
                <h3>Vegetables</h3>
              </div>
            </div>

            <div class="digex-column" @click="${() => gotoRoute("/graduates")}">
              <img src="#" alt="Digital break clip" />
              <div class="sign-item">
                <h3>Digital Design</h3>
              </div>
              <div class="sign-item">
                <h3>Baked Goods</h3>
              </div>
              <div class="sign-item">
                <h3>Fresh Bread</h3>
              </div>
              <div class="sign-item">
                <h3>Wraps</h3>
              </div>
            </div>

            <div
              class="graphic-column"
              @click="${() => gotoRoute("/graduates")}"
            >
              <img src="#" alt="graphic design tag" />
              <div class="sign-item">
                <h3>Graphic Design</h3>
              </div>
              <div class="sign-item">
                <h3>Cold Meats</h3>
              </div>
              <div class="sign-item">
                <h3>Cheese</h3>
              </div>
              <div class="sign-item">
                <h3>Olives</h3>
              </div>
            </div>
          </div>
        </section>

        <section class="about-us">
          <div class="left">
            <img
              src="../../static/images/DeStoreLogo-02.png"
              alt="Destore Logo"
            />
          </div>
          <div class="right">
            <h2>What are we?</h2>
            <p>
              On the other hand, we denounce with righteous indignation and
              dislike men who are so beguiled and demoralized by the charms of
              pleasure of the moment, so blinded by desire, that they cannot
              foresee the pain and trouble that are bound to ensue;<br /><br />and
              equal blame belongs to those who fail in their duty through
              weakness of will, which is the same as saying through shrinking
              from toil and pain. These cases are perfectly simple and easy to
              distinguish. In a free hour, when our power of choice is
              untrammelled and when nothing prevents our being able to do what
              we like best
            </p>
            <button @click="${() => gotoRoute("/about")}">
              Learn about us
            </button>
          </div>
        </section>

        <section class="what-are-people-saying">
          <div class="saying-left">
            <h2>What are people saying?</h2>
          </div>

          <div class="saying-right">
            <div class="saying-joel">
              <h2>Joel Louie</h2>
              <h3>Digital Design Major Coordinator</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                elementum maximus sem non venenatis. In erat turpis, suscipit
                non libero sed, fermentum interdum nunc. Duis sagittis neque sit
                amet."
              </p>
            </div>
            <div class="saying-lee">
              <h2>Lee Ingram</h2>
              <h3>Digital Design Major Coordinator</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                elementum maximus sem non venenatis. In erat turpis, suscipit
                non libero sed, fermentum interdum nunc. Duis sagittis neque sit
                amet."
              </p>
            </div>
            <div class="saying-jonathon">
              <h2>Jonathon Pillai</h2>
              <h3>Digital Design Major Coordinator</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                elementum maximus sem non venenatis. In erat turpis, suscipit
                non libero sed, fermentum interdum nunc. Duis sagittis neque sit
                amet."
              </p>
            </div>
          </div>
        </section>

        <section class="image-slider">
          not sure how we want to code this one in. Might need to look at
          something like slick-slider or glide.js
        </section>

        <footer>
          <div class="footer-content">
            <div class="footer-col">
              <h3>DeStore</h3>
              <p>
                Monday – Saturday: 8:00 am – 4:00pm <br />
                Sunday: 9:00 am – 5:00pm<br />
                Kent St, Bentley, 6102, Western Australia<br /><br />
                @destore
              </p>
            </div>
            <div class="footer-col">
              <h3>Quick Links</h3>
              <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div class="footer-col">
              <h3>Shop</h3>
              <ul>
                <li>Fresh Produce</li>
                <li>Butcher</li>
                <li>Bakery</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
