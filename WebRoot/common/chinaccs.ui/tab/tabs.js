/**
 * @author fddi
 */
var $jq$ = jQuery.noConflict();

(function($jq$) {
	$jq$.fn.extend( {
		cu_tab : function() {
			$jq$(this).addClass("cu-tab");
			var $jq$tab = $jq$(this);
			$jq$tab.cu_buildTab();
		},
		cu_buildTab : function() {
			var $jq$tab = $jq$(this);
			var $jq$tab_list = $jq$tab.children(".cu-tab-header").find("ul");
			$jq$tab_list.addClass("cu-tabul");
			var $jq$tab_head = $jq$tab_list.children("li");
			$jq$tab_head.addClass("cu-tabli");
			var $jq$tab_panels = $jq$tab.children(".cu-tab-panels").children("div");
			$jq$tab_panels.addClass("cu-tabcontent");
			var $jq$tab_panels = $jq$tab.find(".cu-tabli");
			var $jq$content = $jq$tab.find(".cu-tabcontent");
			$jq$tab_panels.eq(0).addClass("tabli-select").attr("selected",
					"selected");
			$jq$content.eq(0).show();
			$jq$tab_panels.each(function(i) {
				$jq$(this).find("a").addClass("cu-a").click(
						function() {
							$jq$tab_panels.removeClass("tabli-select").attr(
									"selected", "no");
							$jq$tab_panels.eq(i).addClass("tabli-select").attr(
									"selected", "selected");
							$jq$content.hide();
							$jq$content.eq(i).show();
						})
				$jq$(this).append("<span class='cu-span'></span>");
				$jq$(this).children(".cu-span").click(function() {
					var isSelect = $jq$tab_panels.eq(i).attr("selected");
					if (isSelect == "selected") {
						var $jq$pre = $jq$tab_panels.eq(i).prev();
						var $jq$next = $jq$tab_panels.eq(i).next();
						//alert($jq$pre.size() + " " + $jq$next.size());
						if ($jq$pre.size() > 0) {
							$jq$tab_panels.removeClass("tabli-select").attr(
									"selected", "no");
							$jq$pre.addClass("tabli-select").attr("selected",
									"selected");
							$jq$content.hide();
							$jq$content.eq(i).prev().show();
						} else if (0 < $jq$next.size()) {
							$jq$tab_panels.removeClass("tabli-select").attr(
									"selected", "no");
							$jq$next.addClass("tabli-select").attr("selected",
									"selected");
							$jq$content.hide();
							$jq$content.eq(i).next().show();
						}
					}
					$jq$tab_panels.eq(i).remove();
					$jq$content.eq(i).remove();
				})
				$jq$(this).hover(function() {
					$jq$(this).addClass("tabli-hover");
				}, function() {
					$jq$(this).removeClass("tabli-hover");
				})
			});
		},
		cu_addTab : function(settings) {
			var p = {
				title : "new tab",
				content : "<p>new content!</p>"
			}
			var ps = $jq$.extend(p, settings);
			var $jq$tab_list = $jq$(this).children(".cu-tab-header").find("ul");
			var $jq$content = $jq$(this).children(".cu-tab-panels");
			$jq$tab_list.append("<li><a>" + ps.title + "</a>");
			$jq$content.append("<div>" + ps.content + "</div>");
			if ($jq$tab_list.width() == $jq$(".cu-tab-header").width()) {
				alert("")
				$jq$tab_list.find("li:first").remove();
				$jq$content.find("div:first").remove();
			}
			$jq$(this).cu_buildTab();
			$jq$(this).find(".cu-tabli").last().find("a").trigger("click");
		}
	})
})(jQuery);
