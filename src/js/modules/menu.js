// export const menu = () => {
//   const btn = document.querySelector('.menu__burger');
//   const menuElem = document.querySelector('.menu__links');
//   const menuLogin = document.querySelector('.menu__login');

//   btn.addEventListener('click', () => {
//     menuElem.classList.toggle('menu__links--active');
//     menuLogin.classList.toggle('menu__login--active');
//   });

//   const closeMenu = () => {
//     menuElem.classList.remove('menu__links--active');
//     menuLogin.classList.remove('menu__login--active');
//   };
//   // Сделал твоим способом закрытие меню по клику вне его :)
//   document.addEventListener('click', (event) => {
//     const target = event.target;

//     if (target.closest('.menu')) {
//       return;
//     }

//     closeMenu();
//   });
// };
