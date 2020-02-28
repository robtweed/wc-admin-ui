class component_sidebar_topdivider extends HTMLElement {
  constructor() {
    super();

    const html = `
<!-- Divider -->
<hr class="sidebar-divider my-0">
<!-- End of Divider -->
    `;

    this.html = `${html}`;
  }

  connectedCallback() {
  }

  disconnectedCallback(element) {
    console.log('*** brand was removed!');
    console.log(element);
  }
}

window.customElements.define('component-sidebar-topdivider', component_sidebar_topdivider);

