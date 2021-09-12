export const menu = () => {
  const btn = document.querySelector('.menu__burger');
  const menuItem = document.querySelector('.menu__links');

  btn.addEventListener('click', () => {
    menuItem.classList.toggle('active');
  });
};
