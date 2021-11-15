import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import GraduateAPI from "../../GraduateAPI";
import Toast from "../../Toast";

class GraduatesView {
  async init() {
    document.title = "Shop";
    this.graduates = null;
    this.render();
    Utils.pageIntroAnim();
    await this.getGraduates();
  }

  async filterGraduates(field, match) {
    // validate
    if (!field || !match) return;

    // get fresh copy of the graduates - reset graduates so that no filters have been applied already
    this.graduates = await GraduateAPI.getGraduates();

    let filteredGraduates;

    // by major
    if (field == "major") {
      filteredGraduates = this.graduates.filter(
        (graduate) => graduate.texture == match
      );
    }

    // by firstName
    if (field == "firstName") {
      // filter this.graduate where graduate.name contains a searchQuery
      filteredGraduates = this.graduates.filter((graduate) =>
        graduate.firstName.toLowerCase().includes(match.toLowerCase())
      );
    }

    // by lastName
    if (field == "lastName") {
      // filter this.graduate where graduate.description contains a searchQuery
      filteredGraduates = this.graduates.filter((graduate) =>
        graduate.lastName.toLowerCase().includes(match.toLowerCase())
      );
    }

    // set and render
    this.graduates = filteredGraduates;
    this.render();
  }

  clearFilterBtns() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach((btn) => btn.removeAttribute("type"));
  }

  async handleSearchKeyup(e) {
    // if search query is empty, clear filters
    if (e.target.value == "") {
      this.getGraduates();
    } else {
      console.log(e.target.value);
      // filter graduates based on name and search query
      await this.filterGraduates("firstName", e.target.value);
      // if no result, filter graduates based on description and search query
      if (this.graduates.length === 0) {
        this.getGraduates();
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
    this.getGraduates();
    this.clearFilterBtns();
  }

  async getGraduates() {
    try {
      this.graduates = await GraduateAPI.getGraduates();
      console.log(this.graduates);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
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
              type="search"
              @keyup=${this.handleSearchKeyup.bind(this)}
              placeholder="Search"
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
            ${this.graduates == null
              ? html` <sl-spinner></sl-spinner> `
              : html`
                  ${this.graduates.map(
                    (graduate) => html`
                      <va-graduates
                        class="graduate-card"
                        id="${graduate._id}"
                        firstName="${graduate.name}"
                        lastName="${graduate.description}"
                        normalPhoto="${graduate.photoMain}"
                        quirkyPhoto="${graduate.photoMain}"
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

export default new GraduatesView();
