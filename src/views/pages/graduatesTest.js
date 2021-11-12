import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import GraduateAPI from "../../GraduateAPI";
import { Graduates } from "../../../static/data/graduateData";
import Toast from "../../Toast";

class GraduatesTest {
  init() {
    document.title = "Shop";
    this.Graduates = Graduates;
    Utils.shuffle(this.Graduates);
    this.render();
    Utils.pageIntroAnim();
  }

  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => btn.removeAttribute("type"));
  }

  resetGrads() {
    this.Graduates = Graduates;
    this.render();
  }

  filterGraduates(field, match) {
    // validate
    if (!field || !match) return;

    // get fresh copy of the graduates - reset graduates so that no filters have been applied already
    this.Graduates;

    let filteredGraduates;

    // by major
    if (field == "major") {
      filteredGraduates = this.Graduates.filter(
        (graduate) => graduate.texture == match
      );
    }

    // by firstName
    if (field == "firstName") {
      // filter this.graduate where graduate.name contains a searchQuery
      filteredGraduates = this.Graduates.filter((graduate) =>
        graduate.firstName.toLowerCase().includes(match.toLowerCase())
      );
    }

    // by lastName
    if (field == "lastName") {
      // filter this.graduate where graduate.description contains a searchQuery
      filteredGraduates = this.Graduates.filter((graduate) =>
        graduate.lastName.toLowerCase().includes(match.toLowerCase())
      );
    }

    // set and render
    this.Graduates = filteredGraduates;
    this.render();
  }

  backSpaceHandler(e) {
    let key = e.keyCode || e.charCode;
    if (key == 8) return e.target.value;
    console.log(e.target.value);
  }

  handleSearchKeyup(e) {
    // if search query is empty, clear filters
    if (e.target.value == "") {
      this.resetGrads();
    } else {
      this.resetGrads();
      // filter graduates based on name and search query
      this.filterGraduates("firstName", e.target.value);
      console.log(this.Graduates);
      // if no result, filter graduates based on description and search query
      if (this.Graduates.length === 0) {
        this.Graduates;
        this.filterGraduates("lastName", e.target.value);
      }
    }
  }

  handleFilterBtn(e) {
    // clear all filter buttons active state (remove type = primary)
    this.clearFilterBtns();

    // set button active (type = primary)
    e.target.setAttribute("type", "primary");
    // extract the field and match from the button
    const field = e.target.getAttribute("data-field");
    const match = e.target.getAttribute("data-match");

    // filter graduates
    this.filterGraduates(field, match);
  }

  clearFilters() {
    this.resetGrads();
    this.clearFilterBtns();
  }

  render() {
    const template = html`
      <va-app-header title="Shop"></va-app-header>
      <div class="page-content">
        <!-- title -->
        <h2>Graduates.</h2>

        <!-- SHOWREEL CONTAINER ---------------------------------->
        <section class="block-100 height-1 showreel-container">
          <h1>showreel container</h1>
          <!-- This is where we will display a couple of the students best works. -->
        </section>

        <!-- FILTER DROPDOWN / SEARCH BAR ---------------------------------->
        <section class="search-and-filter-container">
          <!-- search bar -->
          <div class="search-input-container">
            <input
              class="search-input"
              id="search-input"
              type="search"
              placeholder="Search"
              @keyup=${this.handleSearchKeyup.bind(this)}
              @keydown=${this.backSpaceHandler.bind(this)}
            />
            <i class="fas fa-search"></i>
          </div>

          <!-- search filters -->
          <label class="dropdown">
            <div class="dd-button">Filter</div>
            <input type="checkbox" class="dd-input" id="test" />
            <ul class="dd-menu">
              <li size="small" @click=${this.clearFilters.bind(this)}>
                All Employees
              </li>
              <li class="divider"></li>
              <li
                class="filter-btn"
                size="small"
                data-field="major"
                data-match="animation-and-game-design"
                @click=${this.handleFilterBtn.bind(this)}
              >
                Animation & Game Design
              </li>
              <li class="divider"></li>
              <li
                class="filter-btn"
                size="small"
                data-field="major"
                data-match="graphic-design"
                @click=${this.handleFilterBtn.bind(this)}
              >
                Graphic Design
              </li>
              <li class="divider"></li>
              <li
                class="filter-btn"
                size="small"
                data-field="major"
                data-match="digital-design"
                @click=${this.handleFilterBtn.bind(this)}
              >
                Digital Design
              </li>
            </ul>
          </label>
        </section>

        <!-- ALL STUDENTS ---------------------------------->
        <section class="all-graduates-container">
          <!-- graduate component -->
          <div class="graduate-grid">
            ${Graduates == null
              ? html` <sl-spinner></sl-spinner> `
              : html`
                  ${this.Graduates.map(
                    (graduate) => html`
                      <va-graduates
                        class="graduate-card"
                        firstName="${graduate.firstName}"
                        lastName="${graduate.lastName}"
                        portfolio="${graduate.portfolio}"
                        tagLine="${graduate.tagLine}"
                      >
                      </va-graduates>
                    `
                  )}
                `}
          </div>
          <!-- /component -->
        </section>

        <!-- FOOTER ---------------------------------->
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

export default new GraduatesTest();
