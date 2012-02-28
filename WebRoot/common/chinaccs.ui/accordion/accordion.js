/**
 * @author fddi
 * 
 * chinaccs-ui accordion jquery插件
 */
var $jq$ = jQuery.noConflict();

(function($jq$) {
	$jq$.fn.extend( {
		cu_accordion : function(settings) {
			var p = {
				autoHeight : false
			};
			var ps = $jq$.extend(p, settings);
			var $jq$accordion = $jq$(this); //获取accordion对象
			var height = $jq$accordion.height(); //获取高
			var width = $jq$accordion.width(); //获取宽
			var $jq$caption = $jq$accordion.children("h3");
			var $jq$content = $jq$accordion.children("div");
			$jq$caption.addClass("accordion-caption");
			$jq$content.addClass("accordion-content");
			if (ps.autoHeight) {
				$jq$caption.width(width - 10);
				$jq$content.width(width);
				$jq$caption.addClass("border");
			} else {
				$jq$caption.width(width - 10);
				$jq$content.width(width);
				var ct_height = $jq$accordion.height() - $jq$caption.size() * 31 - 1;
				$jq$content.height(ct_height);
			}
			$jq$caption.append("<span></span>");
			$jq$content.hide();
			$jq$content.first().show();
			$jq$caption.first().find("span").css("backgroundPosition", "top");
			$jq$caption.eq(1).addClass("top_border");
			$jq$caption.each(function(i) {
				$jq$(this).click(
						function() {
							if ($jq$content.eq(i).css("display") == "none") {
								$jq$content.eq(i).slideDown().siblings("div")
										.slideUp();
								$jq$content.eq(i).css("overflow","auto");
								$jq$caption.removeClass("top_border");
								$jq$caption.eq(i + 1).addClass("top_border");
								$jq$caption.find("span").css("backgroundPosition",
										"bottom");
								$jq$(this).find("span").css("backgroundPosition",
										"top");
							} else {
								$jq$content.eq(i).slideUp();
								$jq$caption.eq(i + 1).removeClass("top_border");
								$jq$(this).find("span").css("backgroundPosition",
										"bottom");
							}
						});
			})
		}
	})
})(jQuery);