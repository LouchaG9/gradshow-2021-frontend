import { LitElement, html, css } from 'lit-element';

class AppFooter extends LitElement {
  render() {
    return html`
    <style>
      .smallFooter{
        min-width: 90vw;
        overflow: hidden;
        min-height: 100px;
        background-color: #be1e2d;
      }
    </style>
  <div class="smallFooter"></div>
    

    `;
  }
}

customElements.define('va-app-footer', AppFooter);
