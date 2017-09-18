class popup {
  constructor() {
    this.build();
  }

  async build() {
    const containers = await browser.contextualIdentities.query({});
    const items = document.getElementById("container-items");

    while (items.firstChild) {
      items.firstChild.remove();
    }

    const fragment = document.createDocumentFragment();

    containers.forEach(identity => {
      const item = document.createElement("button");
      item.textContent = identity.name;
      item.addEventListener("click", this);
      const icon = document.createElement("div");
      icon.classList.add("icon");
      icon.style.mask = `url(${identity.iconUrl}) top left / cover`;
      icon.style.backgroundColor = identity.colorCode;
      item.prepend(icon);
      item.setAttribute("data-cookie-store-id", identity.cookieStoreId);

      fragment.appendChild(item);
    });

    items.appendChild(fragment);
  }

  handleEvent(e) {
  console.log(e, this, e.currentTarget);
    const cookieStoreId = e.target.dataset.cookieStoreId;
    browser.tabs.create({
      cookieStoreId
    });
    e.preventDefault();
  }
};

new popup();
