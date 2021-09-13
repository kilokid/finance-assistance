export const menu = () => {
  const btn = document.querySelector('.menu__burger');
  const menuItem = document.querySelector('.menu__links');

  btn.addEventListener('click', () => {
    menuItem.classList.toggle('active');
  });

  const closeMenu = () => {
    menuItem.classList.remove('active');
  };
  // Сделал твоим способом закрытие меню по клику вне его :)
  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('.menu')) {
      return;
    } else {
      closeMenu();
    }
  });
};
