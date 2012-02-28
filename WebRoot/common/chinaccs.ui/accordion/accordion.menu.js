/**
 * @author fddi
 * 滑动菜单
 */
var $jq$ = jQuery.noConflict();

cu.menu = function(id, json) {
	var $jq$menu = $jq$("#" + id);
	var g = {
		creatMenu : function(output) {
			var output = jQuery.parseJSON(json.output);
			$jq$menu.addClass("ad-menu");
			$jq$menu.empty();
			var width = $jq$menu.width();
			var html = "";
			var menuN = [];
			var menuY = [];
			var data = output.data;
			var length = data.length;

			//级菜单分别填入二个数组
			for ( var i = 0; i < data.length; i++) {
				if (data[i][0] == "N") {
					menuN.push(data[i]);
				} else {
					menuY.push(data[i]);
				}
			}
			//alert(menuY + "————" + menuN);
			for ( var i = 0; i < menuN.length; i++) {
				html += '<h3>' + menuN[i][2] + '</h3>';
				html += '<div>';
				for ( var j = 0; j < menuY.length; j++) {
					if (menuN[i][1] == menuY[j][3]) {
						if (menuY[j][4] != null && menuY[j][4] != "null") {
							html += '<a href="javascript:void(0);" name="'
									+ menuY[j][4] + '">' + menuY[j][2] + '</a>';
						}
					}
				}
				html += '</div>';
			}
			//alert(html);
			$jq$menu.append(html);
			$jq$menu.cu_accordion( {
				autoHeight : false
			});
			$jq$menu.find("a").click(function() {
				cu.load("加载中...");
				var url = $jq$(this).attr("name");
				$jq$("#cu-content").load(url, {}, function() {
					cu.prompt.close();
				});
			})
		}
	}
	g.creatMenu(json);
	$jq$(window).resize(
			function() {
				var ct_height = $jq$(".ad-menu").height()
						- $jq$(".accordion-content").size() * 31 - 1;
				$jq$(".accordion-content").height(ct_height);
			})
}