/*
*	jQuery plugin: jCrystalMarquee
*	http://www.crystalsoft.it/
*
*	Written by:		Dario Cancelliere
*	Release date:	22/09/2012
*	Version:		0.3
*	Company:		CrystalSoft
*	Site:			http://www.crystalsoft.it/
*
*	Licensed under the GNU GPL license.
*	http://www.gnu.org/licenses/gpl.txt
*
*	WARNING: This Plugin for Pausing the
*	scroll on mouse hover requires another
*	Plugin called "jquery.pause-resume-animation".
*/

(function($)
{  
	$.fn.marquee = function(options)
	{
		var defaults = {
			duration: 5000,
			sense: "left",
			easeMode: "linear",
			delay: 2000,
			endDelay: 2000,
			init: 500,
			restart: true,
			pause: true,
			memDelay: 10
		};

		var options = $.extend(defaults, options);
		var endPosition = 0;

		return this.each(function()
		{
			var childs = $(this).children("*").clone();

			$("*", this).remove();

			$(this).append("<div class=\"marquee-child\"></div>");

			var object = $(".marquee-child", this);
	
			$(object).append(childs);

			delete childs;

			var containerWidth = parseInt($(this).width());
			var containerHeight = parseInt($(this).height());

			var entireWidth = 0;
			var entireHeight = 0;

			$(object).children("*").each(function()
			{
				var width = parseInt($(this).width() + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right")) + parseInt($(this).css("margin-left")) + parseInt($(this).css("margin-right")) + parseInt($(this).css("border-left-width")) + parseInt($(this).css("border-right-width")));
				var height = parseInt($(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom")) + parseInt($(this).css("margin-top")) + parseInt($(this).css("margin-bottom")) + parseInt($(this).css("border-top-width")) + parseInt($(this).css("border-bottom-width")));

				//var width = parseInt($(this).width() + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right")) + parseInt($(this).css("margin-left")) + parseInt($(this).css("margin-right")));
				//var height = parseInt($(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom")) + parseInt($(this).css("margin-top")) + parseInt($(this).css("margin-bottom")));

				if ((options.sense == "left") || (options.sense == "right"))
				{
					entireWidth += width;

					if (!entireWidth || height > entireWidth)
					{
						entireHeight = height;
					}
				}

				else
				{
					entireHeight += height;

					if (!entireWidth || width > entireWidth)
					{
						entireWidth = width;
					}
				}
			});

			if (!entireWidth)
			{
				entireWidth = $(object).width();
			}

			else if (!entireHeight)
			{
				entireHeight = $(object).height();
			}

			$(object).width(entireWidth);
			$(object).height(entireHeight);

			if ((options.sense == "left") || (options.sense == "right"))
			{
				endPosition = parseInt(entireWidth - containerWidth);
			}

			else
			{
				endPosition = parseInt(entireHeight - containerHeight);
			}

			if ((options.sense == "left") || (options.sense == "right"))
			{
				$(object).css("left", (options.sense == "left") ? "0px" : "-" + endPosition +  "px");
			}

			else
			{
				$(object).css("top", (options.sense == "top") ? "0px" : "-" + endPosition +  "px");
			}

			startCallback(object, false, options.delay);

			if (options.pause)
			{
				$(object).hover(function()
				{
					if (typeof($.fn.pause) != "undefined")
					{
						$(object).pause();
					}
				},
				function()
				{
					if (typeof($.fn.resume) != "undefined")
					{
						$(object).resume();
					}
				});
			}
		});

		function startCallback(object, reset, delay)
		{
			if (typeof(reset) == "undefined")
			{
				reset = false;
			}

			if (typeof(delay) == "undefined")
			{
				delay = 0;
			}

			if ((options.sense == "left") || options.sense == "right")
			{
				if (reset)
				{
					$(object).delay(options.endDelay).animate({"left": (options.sense == "left") ? "0px" : "-" + endPosition +  "px"}, options.init, options.easeMode, function()
					{
						startCallback(object, false, options.delay);
					});
				}

				else
				{
					$(object).delay(delay).animate({"left": (options.sense == "right") ? "0px" : "-" + endPosition +  "px"}, options.duration, options.easeMode, function()
					{
						endCallback(object);
					});
				}
			}

			else
			{
				if (reset)
				{
					$(object).delay(options.endDelay).animate({"top": (options.sense == "top") ? "0px" : "-" + endPosition +  "px"}, options.init, options.easeMode, function()
					{
						startCallback(object, false, options.delay);
					});
				}

				else
				{
					$(object).delay(delay).animate({"top": (options.sense == "bottom") ? "0px" : "-" + endPosition +  "px"}, options.duration, options.easeMode, function()
					{
						endCallback(object);
					});
				}
			}
		}

		function endCallback(object)
		{
			startCallback(object, true, options.delay);
		}
	};
})(jQuery);