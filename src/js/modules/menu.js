export const menu = () => {
  const menuButton = document.querySelector('.menu__burger');
  const menuList = document.querySelector('.menu__list');

  const closeMenu = () => {
    menuList.classList.remove('menu__list--active');
  };

  menuButton.addEventListener('click', () => {
    let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
    menuButton.setAttribute('aria-expanded', !expanded);
    menuList.classList.toggle('menu__list--active');
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.menu')) {
      return;
    }

    closeMenu();
  });
};
