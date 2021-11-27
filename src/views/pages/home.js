import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Utils from "./../../Utils";
import gsap from "gsap";

// How to use the data //
import { Graduates } from "./../../../static/data/graduateData";

// Graduates.map((graduate) => {
//   console.log(graduate.firstName);
// });

class HomeView {
  init() {
    document.title = "Home";
    this.videoCurrent = 1;
    this.videoIndexLink = {
      1:"https://www.youtube.com/embed/AfoN2dwqYIc",
      2:"https://www.youtube.com/embed/pJEOZfFrE_U",
      3:"https://www.youtube.com/embed/4btrAVnLCR0"
    };
    this.videoIndexTitle = {
      1:"Graphic Design",
      2:"Digital Design",
      3:"Animation And Game Design"
    };
    this.render();
    this.ramdonVideoSelector();
    this.handleScrollTop();
    this.videoResize();
    this.listenToWidthChange();
    this.pageIntroAnim2();
  }

  pageIntroAnim2() {
    gsap.from(
      ".subheading",
      { x: -1000, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
    gsap.from(
      ".animation-column",
      { y: -600, opacity: 0 },
      { x: 0, opacity: 1, duration: 3 },
      "-=1"
    );
    gsap.from(
      ".digex-column",
      { y: -400, opacity: 0 },
      { x: 0, opacity: 1, duration: 3 }
    );
    gsap.from(
      ".graphic-column",
      { y: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 3 },
      "-=1"
    );
  }

  ramdonVideoSelector() {
    let indexNum = Math.floor((Math.random() * 3) + 1);
    this.renderVideoDiv(indexNum);
  }

  handleScrollTop() {
    let ele = document.querySelector("#topBannerLeft");
    let toTop = ele.clientTop;
    window.scroll({
      top: toTop,
      behavior: "smooth",
    });
  }

  videoResize() {
    let ele = document.querySelector("#topBannerLeft");
    let targetVideoHolder = document.querySelector(".gradVideoHolder");
    let topBannerHolderWidth = ele.clientWidth;
    if(window.innerWidth > 768){
      targetVideoHolder.style.width = topBannerHolderWidth*0.8 + "px";
      targetVideoHolder.style.height = topBannerHolderWidth*0.8/16*9 + "px";
    } else if (window.innerWidth <= 768){
      targetVideoHolder.style.width = topBannerHolderWidth + "px";
      targetVideoHolder.style.height = topBannerHolderWidth/16*9 + "px";
    };
    let currentPage = window.location.pathname;
    if(currentPage === "/"){
      //pass
    } else {
      window.removeEventListener('resize', this.videoResize);
    }
  }

  listenToWidthChange() {
    try {
      window.removeEventListener('resize', this.videoResize);
    } catch (error) {
      console.log(error)
    }
    window.addEventListener('resize', this.videoResize);
  }

  videoTriggerCal(tra) {
    if(tra === "-"){
      if(this.videoCurrent === 1){
        this.videoCurrent = 3;
        this.renderVideoDiv(this.videoCurrent);
      } else {
        this.videoCurrent -= 1;
        this.renderVideoDiv(this.videoCurrent);
      }
    } else if(tra === "+") {
      if(this.videoCurrent === 3){
        this.videoCurrent = 1;
        this.renderVideoDiv(this.videoCurrent);
      } else {
        this.videoCurrent += 1;
        this.renderVideoDiv(this.videoCurrent);
      }
    }
  }

  renderVideoDiv(i) {
    let eleIframe = document.querySelector("#videoIframe");
    eleIframe.src = this.videoIndexLink[i];
    let eleTitle = document.querySelector("#majorTitle");
    eleTitle.innerHTML = this.videoIndexTitle[i];
  }

  render() {
    const template = html`
    
      <va-app-header title="Home"></va-app-header>

      <div class="page-content" id="pageContent">
        <section class="banner">
          <div class="left" id="topBannerLeft">
            <h2 class="subheading">
              Welcome to the DeStore 2021 Curtin Design Graduate Showcase
            </h2>
            <button
              class="shop-graduates-btn"
              @click="${() => gotoRoute("/graduates")}"
            >
              Shop all graduates
            </button>
          </div>
          <div class="right">
            <div class="gradVideoHolder">
              <iframe id="videoIframe" width="100%" height="100%"
                src="https://www.youtube.com/embed/VJGbuDb7pbM?list=TLGGo8m-auYN_bYyNjExMjAyMQ" 
                title="YouTube video player" 
                frameborder="0" 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            <div class="videoTriggerHolder">
              <div class="videoTriggerButtonLeft" @click="${() => this.videoTriggerCal("-")}"> <h3> < </h3></div>
              <div class="videoTriggerDiv"> <h3><span id="majorTitle">DD Grads</span></h3> </div>
              <div class="videoTriggerButtonLeft" @click="${() => this.videoTriggerCal("+")}"> <h3> > </h3></div>
            </div>
          </div>
        </section>

        <section class="about-us">
          <div class="left">
            <img
              src="https://drive.google.com/uc?export=view&id=1JxGAVQPoi8QiT08CvTJ3HCLaUbvSQoiu"
              alt="Destore Logo"
              class="logo-img"
            />
          </div>
          <div class="right">
            <h2>What are we?</h2>
            <p>
              
            </p>
            <button class="learn" @click="${() => gotoRoute("/about")}">
              Learn about us
            </button>
          </div>
        </section>

        <section class="reviews">
          <div class="left">
            <h2 class="subheading">What are people saying?</h2>
          </div>

          <div class="right">
            <div class="quote-one">
              <h3 class="tutor">JONATHON PILLAI</h3>
              <i><h4 class="majorQuote">Animation & Game Design Coordinator</h4></i>
              <p>
                "It has been brilliant to witness how our AGD students have strived towards their goals while pursuing their craft with passion and creativity. I am proud of how they have showcased the quality of their work by winning competitions, securing industry attachments and even garnering job offers before they graduate."
              </p>
            </div>
            <div class="quote-two">
              <h3 class="tutor">JOEL LOUIE</h3>
              <i><h4 class="majorQuote">Digital Experience & Interaction Design Coordinator</h4></i>
              <p>
                "I’ve been impressed by the dynamic teamwork of all the DigEx and AGD Grads, and the fantastic Grad Show tapestry that they have woven here. More than that, its been humbling to see the growth in each individual, and the amount time, focus and love they have each put into their portfolios. I hope you enjoy this fresh serving of design goodness"
              </p>
            </div>
            <div class="quote-three">
              <h3 class="tutor">LEE INGRAM</h3>
              <i><h4 class="majorQuote">Graphic Design Coordinator</h4></i>
              <p>
                "With the year not even over, we have already seen much success from the graduating Graphic Design students, numerous finalists in the AGDA student award categories, a number of our students undertook industry internships, and best of all, a lucky few locked in continuing industry positions before they had even wrapped up their studies."
              </p>
            </div>
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

export default new HomeView();
