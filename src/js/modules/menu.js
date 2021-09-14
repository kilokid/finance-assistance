export const menu = () => {
  const btn = document.querySelector('.menu__burger');
  const menuElem = document.querySelector('.menu__links');

  btn.addEventListener('click', () => {
    menuElem.classList.toggle('menu--active');
  });

  const closeMenu = () => {
    menuElem.classList.remove('menu--active');
  };
  // Сделал твоим способом закрытие меню по клику вне его :)
  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.menu')) {
      return;
    }

    closeMenu();
  });
};
