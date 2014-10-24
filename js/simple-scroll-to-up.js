/** Simple scroll to up by ValianT | https://github.com/one-more-developer/simple-scroll-to-up */
window.addEventListener('load', function () {
	var STUConfig = STUConfig || {};
	var button = document.createElement('span');
	button.classList.add('stu-button');
	document.body.appendChild(button);

	var isMoving, interval;
	var startMoving = function () {
		if (isMoving) {
			stopMoving();
		}
		isMoving = true;
		var step = window.scrollY / 100;
		interval = setInterval(function () {
			var to = window.scrollY - step;
			window.scrollTo(0, to >= 0 ? to : 0);
			if (window.scrollY === 0) {
				clearInterval(interval);
			}
		}, (STUConfig.time || 1000) / 100);
	};
	var stopMoving = function () {
		if (isMoving) {
			clearInterval(interval);
			interval = isMoving = false;
		}
	};

	var onScroll = function (button) {
		var buttonIsVisible = false;
		return function (e) {
			if (e.pageY > window.screen.availHeight) {
				if (!buttonIsVisible) {
					button.classList.add('active');
				}
			}
			else {
				if (buttonIsVisible) {
					button.classList.remove('active');
				}
			}
			buttonIsVisible = (e.pageY > window.screen.availHeight);
		};
	};

	button.addEventListener('click', function (e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		startMoving();
	});

	document.body.addEventListener('click', function () {
		stopMoving();
	});

	window.addEventListener('scroll', onScroll(button));
}, false);
