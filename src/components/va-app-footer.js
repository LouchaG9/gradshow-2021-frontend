import { LitElement, html, css } from 'lit-element';

class AppFooter extends LitElement {
  render() {
    return html`
<style>
  footer {
	 max-width: 100%;
	 background-color: var(--agd-green);
	 padding: 1rem;
	 max-width: 1920px;
	 margin: 0 auto;
   
}
 footer .footer-content {
	 display: flex;
	 align-items: center;
	 justify-content: space-between;
	 gap: 1rem;
	 width: 90%;
	 margin: 0 auto;
}
 footer .footer-content .destore-col {
	 width: calc(100% / 3);
	 display: flex;
	 flex-direction: column;
	 justify-content: center;
}
 footer .footer-content .destore-col h3 {
	 font-size: 2rem;
	 color: var(--brand-color);
	 font-family: var(--heading-font-family-B);
}
 footer .footer-content .major-col {
	 background: var(--body-bg);
	 width: calc(100% / 3 * 2 / 3);
	 border-radius: 3px;
}
 footer .footer-content .footer-digex-column, footer .footer-content .footer-graphic-column, footer .footer-content .footer-animation-column {
	 height: auto;
	 margin-top: 1rem;
	 margin-bottom: 1rem;
	 font-family: var(--heading-font-family-B);
	 font-size: calc(0.5vw + 0.5vh + 0.5vmin);
	 text-align: center;
	 display: flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	 gap: 0.5rem;
}
 footer .footer-content .footer-digex-column .footer-item, footer .footer-content .footer-graphic-column .footer-item, footer .footer-content .footer-animation-column .footer-item {
	 min-height: 2rem;
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 justify-content: center;
	 border-radius: 3px;
	 transition: 0.2s;
	 cursor: pointer;
	 width: 90%;
	 margin: 0 auto;
}
 footer .footer-content .footer-digex-column .footer-item {
	 background: var(--dig-yellow);
}
 footer .footer-content .footer-digex-column .footer-item:hover {
	 background: #ceb169;
}
 footer .footer-content .footer-graphic-column .footer-item {
	 background: var(--gd-red);
}
 footer .footer-content .footer-graphic-column .footer-item:hover {
	 background: #c29982;
}
 footer .footer-content .footer-animation-column .footer-item {
	 background: var(--agd-green);
}
 footer .footer-content .footer-animation-column .footer-item:hover {
	 background: #8eb4a9;
}

@media (max-width: 1200px) {
 #photos {
 -moz-column-count:    4;
 -webkit-column-count: 4;
 column-count:         2;
 }
}
@media (max-width: 1000px) {
 #photos {
 -moz-column-count:    3;
 -webkit-column-count: 3;
 column-count:         2;
 }
}
@media (max-width: 800px) {
 #photos {
 -moz-column-count:    2;
 -webkit-column-count: 2;
 column-count:         1;
 }
}
@media (max-width: 400px) {
 #photos {
 -moz-column-count:    1;
 -webkit-column-count: 1;
 column-count:         1;
 }
}
 
</style>

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
  }
}

customElements.define('va-app-footer', AppFooter);
