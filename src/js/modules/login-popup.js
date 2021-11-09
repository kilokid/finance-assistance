export const loginPopup = () => {
  const buttonLogin = document.querySelector('.user-list__login');
  const modal = document.querySelector('.modal');

  const openModal = () => {
    modal.classList.remove('modal--hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('modal--hidden');
    document.body.style.overflow = '';
  };

  buttonLogin.addEventListener('click', openModal);

  modal.addEventListener('click', (event) => {
    const target = event.target;
    console.log(target);
    if (target.classList.contains('modal__overlay') || target.classList.contains('modal__close')) {
        closeModal();
    }
  });
};

