'use strict';

var ajaxPages = {

	ctrl: false,

	init: function () {
		$(document)
			.on('click', 'a', ajaxPages.click)
			.on('keydown', ajaxPages.keydown)
			.on('keyup', ajaxPages.keyup);

		let onpopstateAccess = true;

		$(document)
			.on('scroll-start', function () {
				onpopstateAccess = false;
			})
			.on('scroll-complete', function () {
				setTimeout(() => {
					onpopstateAccess = true;
				}, 100);
			})

		window.onpopstate = function (event) {
			if (onpopstateAccess) {
				ajaxPages.load(document.location.href, true);
			}
		}
	},

	keydown: function (e) {
		if (e.keyCode == 17 || e.keyCode == 162 || e.keyCode == 163 || e.ctrlKey || e.keyCode == 91 || e.keyCode == 93) {
			ajaxPages.ctrl = true;
		}
	},

	keyup: function () {
		ajaxPages.ctrl = false;
	},

	click: function (e) {
		var isAjaxUrl = (
			!$(this).attr('download') &&
			$(this).attr('href').indexOf('javascript:') == -1 &&
			$(this).attr('href')[0] != '#' &&
			$(this).attr('target') != '_blank' &&
			$(this).attr('data-ajax') != 'false'
		);

		if (isAjaxUrl) {
			if (ajaxPages.ctrl == false) {
				e.preventDefault();

				if ($(this).attr('data-selector')) {
					ajaxPages.load({
						url: $(this).attr('href'),
						selector: $(this).attr('data-selector'),
						append: $(this).attr('data-append')
					});
				} else {
					ajaxPages.load($(this).attr('href'));
				}
			}
		}
	},

	loadAjax: false,
	load: function (url, onpopstate) {
		var obj = typeof url === 'object' ? url : {
			scrollTop: true,
			getScripts: true,
			url: url,
			onpopstate: onpopstate
		};

		if (!ajaxPages.loadAjax) {
			ajaxPages.loadAjax = true;

			var createRequestObject = function () {
				try {
					return new XMLHttpRequest()
				} catch (e) {
					try {
						return new ActiveXObject('Msxml2.XMLHTTP')
					} catch (e) {
						try {
							return new ActiveXObject('Microsoft.XMLHTTP')
						} catch (e) {
							return null;
						}
					}
				}
			};

			var http = createRequestObject();
			if (http) {
				if (!obj.append) {
					$('body').append('<div class="preloader-wrap"><style>body{background:}header, main, footer, .fade, .hide {display:non}</style><div class="modal-backdrop fade show" style="opacity: 0.2;"></div><div class="preloader" style="z-index: 12343212;"><div class="spinner-border text-info" role="status"></div></div></div>');
				}

				http.open('get', obj.url);
				http.onreadystatechange = function () {
					if (http.readyState == 4) {
						if (http.responseText.indexOf('ajax.js') > -1) {
							if (!obj.onpopstate) {
								history.pushState({ state: new Date().getTime() }, document.title, obj.url);
							}

							if (obj.selector) {
								if (obj.append) {
									$(obj.selector).append($(obj.selector, http.responseText).html());
								} else {
									$(obj.selector).html($(obj.selector, http.responseText).html());
								}

								if ($('.pagination-container', http.responseText).length > 0) {
									$('.pagination-container').replaceWith($('.pagination-container', http.responseText).clone());
								}
							} else {
								document.documentElement.innerHTML = http.responseText;
							}

							if (obj.scrollTop) {
								$(document).scrollTop(0);
							}

							if (obj.getScripts) {
								ajaxPages.getScripts();
							} else {
								$('.preloader-wrap').remove();
								$('html').trigger('ajaxLoad');
							}

							ajaxPages.loadAjax = false;
						} else {
							window.location.href = obj.url;
						}

						if (typeof window.dataAjaxFormEach !== 'undefined') {
							window.dataAjaxFormEach();
						}
					}
				}
				http.send(null);
			}
		}
	},

	getScripts: function () {
		if ($('script[data-once!="true"]').length == 0) {
			$('.preloader-wrap').remove();
			$('html').trigger('ajaxLoad');
		} else {
			$('script[data-once!="true"]').each(function () {
				$(this).attr('data-once', 'true');

				var script = document.createElement('script');
				script.setAttribute('data-once', 'true');

				if ($(this).attr('src')) {
					script.src = $(this).attr('src');
					script.onload = script.onreadystatechange = function () {
						setTimeout(ajaxPages.getScripts, 0);
					};
					script.onerror = function () {
						setTimeout(ajaxPages.getScripts, 0);
					};

					if (script.src.indexOf('/build/') > -1) {
						script.setAttribute('type', 'module');
					}

					document.head.appendChild(script);
				} else {
					if ($(this).html().indexOf('document.write') == -1) {
						script.appendChild(document.createTextNode($(this).html()));
						document.head.appendChild(script);
					}
					setTimeout(ajaxPages.getScripts, 0);
				}

				$(this).remove();

				return false;
			});
		}
	}

}

$(ajaxPages.init);
