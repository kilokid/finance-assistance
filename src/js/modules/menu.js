export const menu = () => {
  'use strict';
  const menuButton = document.querySelector('.menu__burger');
  const menuList = document.querySelector('.menu__list');

  const closeMenu = () => {
    menuList.classList.remove('menu__list--active');
  };

  const ariaAttribute = () => {
    let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
    menuButton.setAttribute('aria-expanded', !expanded);
  };

  menuButton.addEventListener('click', () => {
    // let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
    // menuButton.setAttribute('aria-expanded', !expanded);
    ariaAttribute();
    menuList.classList.toggle('menu__list--active');
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.menu')) {
      return;
    }
    menuButton.setAttribute('aria-expanded', false);
    closeMenu();
  });
};
