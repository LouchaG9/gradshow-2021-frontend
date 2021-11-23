import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Utils from "../../Utils";

// How to use the data //
import { Graduates } from "../../../static/data/graduateData";

// Graduates.map((graduate) => {
//   console.log(graduate.firstName);
// });

// so now an issue found was when we open the home page, click the about page,
// and then come back to home page, the slider lost its style,
// the temporary ( or maybe this is the only ) solution is use "gotoRoute"
// to force a re-fresh, silly but it works.

class comingSoonView {
  init() {
    console.log("HomeView.init");
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();


// Set the date we're counting down to
var countDownDate = new Date("Nov 26, 2021 11:59:59").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="demo"
  document.getElementById("timing").innerHTML = days + " days, " + hours + " hours, "
  + minutes + " minutes, & " + seconds + " seconds left!";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timing").innerHTML = "🎉 Site launch immminent 🎉";
  }
}, 1000);



  }


  

  render() {
    const template = html`
      <div class="page-content">
      <div class="bgimg">
  <div class="topleft">
  </div>
  <div class="middle">
  <img class="comingSoonLogo"
    src="./images/DeStoreLogo-02.png"
    />
    <h1>COMING SOON</h1>
    <hr>
    <div class="timingDiv">
    <p id="timing" ></p>
    </div>
  </div>

</div>
        </div>

    `;
    render(template, App.rootEl);
  }
}

export default new comingSoonView();
