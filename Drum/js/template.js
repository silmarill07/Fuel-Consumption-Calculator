'use strict';

var template = {

	init: function () {
		template.header();
		template.dropdown();
		// template.toggleScroll();
		template.htmlLoad();
	},

	htmlLoad: function () {
		console.log('htmlLoad')
		var functions = function () {
			if ($.fn.tooltip) {
				$('[data-toggle="tooltip"]').tooltip();
			}

			if ($('.pagination-container').length > 0) {
				$('#pageload_container').remove();
				if ($('.page-item.active').next().find('a').attr('href')) {
					$('.pagination-container').after('\
						<div id="pageload_container" class="text-center mt-2">\
							<a class="btn btn-primary btn-sm" data-selector="#entries" data-append="true" href="'+ $('.page-item.active').next().find('a').attr('href') + '">'+ window.JS_TRANSLATE.music.show_more +'</a>\
						</div>\
					');
				}
				$('#pageload_container a').one('click', function () {
					$(this).html('<i class="fas fa-circle-notch fa-spin"></i>');
				});
			}

			template.bodyPadding();
		};
		$(document).on('ajaxLoad', 'html', functions);
		functions();
	},

	toggleScroll: function () {
		$(document).on('click', '[data-toggle="scroll"]', function (e) {
			e.preventDefault();
			$('[data-toggle="dropdown"]').dropdown('hide');
			var target = $(($(this).attr('href') ? $(this).attr('href') : $(this).attr('data-target'))),
				scrollTop = target.offset().top;

			$('[data-fixed-elem]').each(function () {
				if ($(this).css('display') != 'none') {
					scrollTop -= parseFloat($(this).css('height'));
				}
			});

			$('html, body').stop().animate({
				'scrollTop': scrollTop
			}, 400, 'swing', function () {
				$(document).trigger('scroll_complete');
			});
		});
	},

	dropdown: function () {
		$(document).on('click', '*', function (e) {
			if ((
				!$(e.target).is('[data-toggle], .dropdown-menu') ||
				($(this)[0].tagName == 'A' && $(e.target).is('.dropdown-menu'))
			) && $.fn.dropdown) {
				$('[data-toggle="dropdown"]').dropdown('hide');
			}
		});
	},

	bodyPadding: function () {
		$('body').css('padding-top', $('header#header').css('height'));
		$('#content_none').remove();
	},

	header: function () {
		window.onresize = template.bodyPadding;
		template.bodyPadding();

		$(document).on('click', '[data-target="#navbarToggler"] *', function () {
			$(this).parents('[data-toggle]').click();
		});

		$(document).on('show.bs.collapse', '#navbarToggler', function () {
			var timerShow = 300;
			$('.navbar-nav li.nav-item').each(function () {
				$(this).stop().animate({
					'opacity': '1',
					'width': '100%'
				}, timerShow);
				timerShow = timerShow + 300;
			});
		});

		$(document).on('hidden.bs.collapse', '#navbarToggler', function () {
			$('#navbarToggler li.nav-item').stop().attr('style', '');
		});

		$(document).on('click', '[data-toggle="search"]', function () {
			$('.navbar .mini_profile, .navbar .navbar-toggler, .navbar .logo').toggle();
			$('#fast_search').toggleClass('d-none');
			$('[data-toggle="search"] *').toggleClass('d-none');
			$(this).toggleClass('show');
			if ($(this).hasClass('show')) {
				$('#fast_search input').focus();
			}
		});
	}

}

$(template.init);
