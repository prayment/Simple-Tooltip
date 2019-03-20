/*
 *  MIT License 
 *
 *	A small jQuery based library to generate tooltips.
 * 	Elements with the attribute data-tooltip will have tooltips generated once sT.init() is called
 *	
 *	Other methods:
 * 	color(color) : replaces and returns tooltip color, or just returns tooltip color if no argument is present
 * 	backgroundColor(color) : replaces and returns tooltip background-color, or just returns tooltip background-color if no argument is present
 * 	opacity(opacity) : replaces and returns tooltip opacity, or simply returns tooltip opacity if no argument is present
 */

var sT = {
	_textColor: "white",
	_backgroundColor: "899af9",
	_opacity: 0.95,

	init: function () {
		$("head").append('<style id="simpleTooltipCSS" type="text/css"></style>');

		var tooltip = $(document.createElement("div"));
		tooltip.attr("id", "simpleTooltip");
			var tooltip_text = $(document.createElement("span"));
			tooltip_text.html("test");
			tooltip_text.attr("style", "opacity: 1;");
			tooltip_text.attr("id", "simpleTooltipText");
		tooltip.append(tooltip_text);

		$("body").append(tooltip);


		$('*[data-tooltip]').each(function(i, ele) {		
			var ele = $(ele);
			var text = ele.attr("data-tooltip");

			ele.on("mouseover", function () {sT._tooltip(ele, text)});
			ele.on("mouseout", function () {sT._hideTooltip()});
		});
		
		tooltip.hide();
		this._reStyle();
	},
	_reStyle: function () {
		$("#simpleTooltipCSS").text("#simpleTooltip {pointer-events: none; padding: 2px 4px;border-radius: 4px;  position: absolute; display: inline-block; color:" + this._textColor + "; background-color: " + this._backgroundColor + "; opacity: " + this._opacity + "}");
	},
	_tooltip: function (ele, text) {
		$("#simpleTooltip").stop( true, true ).fadeIn();
		$("#simpleTooltipText").html(text);

		var offset = $(ele).offset();
		var height = $(ele).height();
		var width = $(ele).width();
		
		var offset_top = Math.max(offset.top + height/2 - $("#simpleTooltip").height()/2, 0);
		var offset_left = offset.left + width + 4;

		if (offset_left + $("#simpleTooltipText").width() > $(window).width()) {
			offset_left = offset.left - $("#simpleTooltipText").width() - 12
		}
		if (offset_top + $("#simpleTooltip").height() > $(window).height()) {
			offset_top = $(window).height() - $("#simpleTooltip").height() - 10;
		}

		if (width) {
			$("#simpleTooltip").offset({ top: (offset_top), left: (offset_left)});
		}
	},
	_hideTooltip: function () {
		$("#simpleTooltip").stop( true, true ).fadeOut();
	},
	color: function (color) {
		if (!color) {return this._textColor}

		this._textColor = color;
		this._reStyle();

		return this._textColor;
	},
	backgroundColor: function (color) {
		if (!color) {return this._backgroundColor}

		this._backgroundColor = color;
		this._reStyle();

		return this._backgroundColor;
	},
	opacity: function (opacity) {
		if (!opacity) {return this._opacity}

		this._opacity = opacity;
		this._reStyle();

		return this.opacity
	}
}
