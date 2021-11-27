import App from './../../App'
import { html, render } from 'lit-html'
import { gotoRoute, anchorRoute } from "./../../Router"

class FourOFourView {
  init() {
    document.title = '404 File not found'
    this.render()
  }

  render() {
    const template = html`    
      <div class="calign">
        <h1>Opps!</h1>
        <p>Sorry, we couldn't find that.</p>
        <button
          class="return-home-btn"
          @click="${() => gotoRoute("/")}"
        >HOME
        </button>
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new FourOFourView()