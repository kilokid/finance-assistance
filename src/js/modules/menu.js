export const menu = () => {
  const menuButton = document.querySelector('.menu__burger');
  const menuList = document.querySelector('.menu__list');

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    menuList.classList.toggle('menu__list--active');
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.menu')) {
      return;
    }
    menuButton.setAttribute('aria-expanded', false);
    menuList.classList.remove('menu__list--active');
  });
};
