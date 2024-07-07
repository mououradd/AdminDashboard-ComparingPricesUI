(function (window, document, undefined) {
	'use strict';

	/*==============================
	Header
	==============================*/
	if (document.querySelector('.header')) {
		const headerBtn = document.querySelector('.header__btn');
		const headerNav = document.querySelector('.header__menu');
		const header = document.querySelector('.header');
        
		function toggleHeaderMenu() {
			headerBtn.classList.toggle('header__btn--active');
			headerNav.classList.toggle('header__menu--active');
		}

		function toggleHeaderActive() {
			header.classList.toggle('header--active', window.scrollY > 0);  
		}

		headerBtn.addEventListener('click', toggleHeaderMenu);
		window.addEventListener('scroll', toggleHeaderActive);
		toggleHeaderActive();
	}
})(window, document);