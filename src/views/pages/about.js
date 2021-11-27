import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Utils from "../../Utils";

class AboutView {
  init() {
    document.title = "Curtin DeStore - About Page";
    this.render();
    this.handleScrollTop();
    Utils.pageIntroAnim();
  }

  handleScrollTop() {
    let ele = document.querySelectorAll(".about-banner");
    let toTop = ele[0].clientTop;
    window.scroll({
      top: toTop,
      behavior: "smooth",
    });
  }

  render() {
    const template = html`
      <va-app-header title="About page"></va-app-header>
      <div class="page-content">
        <section class="about-banner">
        
          <div class="valueHolder">
            <div class="values-logo">
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
          </div>

          <img src="/images/DeStoreLogo-02.png" class="about-img" />
        </section>

        

        <div class="credit-logo">
          <div class="credits-logo"></div>
          <h1>Credits</h1>
        </div>

        <section class="block-100 credit-fill">
          <div class="credit-block" id="tres">
            <h3>Website Programmers</h3>
            <ul>
              <li>Louis Klause</li>
              <li>Julian Osborn</li>
              <li>Shi Ning Wang</li>
              <li>Ruitan Huang</li>
              <li>Rebekah van Zalm</li>
            </ul>
          </div>

          <div class="credit-block">
            <h3>Testing & Quality Team</h3>
            <ul>
              <li>Nina Dakin</li>
              <li>Daffa Rizkiadi</li>
              <li>Julian Osborn</li>
              <li>Lucas Vieira</li>
              <li>Shi Ning Wang</li>
              <li>Alexandra McGee</li>
              <li>Sylvia Chen</li>
              <li>Eden Leicester</li>
              <li>Michelle Thomas</li>
              <li>Lachlan Robertson</li>
              <li>Jekko Cabral</li>
              <li>Sophie Till</li>
            </ul>
          </div>

          <div class="credit-block">
            <h3>Animation & Video Production Team</h3>
            <ul>
              <li>Sylvia Chen</li>
              <li>Michelle Thomas</li>
              <li>Sophie Till</li>
              <li>Dana Knowles</li>
              <li>Eden Leicester</li>
              <li>Alex Bertilone</li>
              <li>Nina Dakin</li>
              <li>Ella Matthews</li>
              <li>Joshua Michell</li>
              <li>Daffa Rizkiadi</li>
              <li>Lachlan Robertson</li>
              <li>Jekko Cabral</li>
              <li>Yaeram Kim</li>
              <li>Jamin Saw</li>
            </ul>
          </div>

          <div class="credit-block">
            <h3>Photography Team</h3>
            <ul>
              <li>Ruitan Huang</li>
              <li>Dana Knowles</li>
              <li>Jet Trijo</li>
              <li>Joshua Michell</li>
              <li>Brandon Watson</li>
            </ul>
          </div>
          
          <div class="credit-block">
            <h3>Website Data Management</h3>
            <ul>
            <li>Julian Osborn</li>
              <li>Emily Mee</li>
              <li>Michael D'Costa</li>
              <li>Brandon Watson</li>
              <li>Ruitan Huang</li>
              <li>Rebekah van Zalm</li>
              <li>Louis Klause</li>
              <li>Jet Trijo</li>
            </ul>
          </div>

          <div class="credit-block">
            <h3>Communications & Logistics Team</h3>
            <ul>
              <li>Joshua Michell</li>
              <li>Dana Knowles</li>
              <li>Tian Hock Yan</li>
              <li>Michael D'Costa</li>
              <li>Ella Matthews</li>
              <li>Ruitan Huang</li>
              <li>Jet Trijo</li>
              <li>Yaeram Kim</li>
              <li>Emily Harding</li>
              <li>Joaquin Atizado</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>UI / UX Designers</h3>
            <ul>
              <li>Rebekah Van Zalm</li>
              <li>Ruitan Huang</li>
              <li>Tian Hock Yan</li>
              <li>Michael D'Costa</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Social Media</h3>
            <ul>
              <li>Joshua Mitchell</li>
              <li>Jet Trijo</li>
              <li>Rebekah van Zalm</li>
              <li>Leah Schultz</li>
              <li>Dana Knowles</li>
            </ul>
          </div>
          <div class="credit-block">
            <h3>Treasury</h3>
            <ul>
              <li>Ella Edwards</li>
              <li>Lachlan Robertson</li>
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
