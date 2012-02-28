/**
 * @author fddi
 * 
 */
cu.menu = function(id, json) {
	var $menu = $("#" + id);
	var g = {
		creatMenu : function(json) {
			var output = jQuery.parseJSON(json.output);
			if (output.result != "0") {
				cu.info("定制菜单失败:" + output.msg);
				return;
			}
			$menu.addClass("ad-menu");
			$menu.empty();
			var width = $menu.width();
			var html = "";
			var menup = [];
			var menuc = [];
			var menue = [];
			var data = output.data;
			var length = data.length;

			//三级菜单分别填入三个数组
			for ( var i = 0; i < data.length; i++) {
				if (data[i][0] == "1") {
					menup.push(data[i]);
				}
				if (data[i][0] == "2") {
					menuc.push(data[i]);
				} else
					menue.push(data[i]);
			}

			for ( var i = 0; i < menup.length; i++) {
				html += '<h3>' + menup[i][2] + '</h3>';
				html += '<div class="ad-f">';
				for ( var j = 0; j < menuc.length; j++) {
					if (menuc[j][3] == menup[i][1]) {
						if (menuc[j][4] != null) {
							html += '<a href="javascript:void(0);" name="'
									+ menuc[j][4] + '">' + menuc[j][2] + '</a>';
						} else {
							html += '<div class="ad-s"><h3>' + menuc[j][2] + '</h3><div class="ad-final">';
							for ( var n = 0; n < menue.length; n++) {
								if (menue[n][3] == menuc[j][1]) {
									html += '<a href="javascript:void(0);" name="'
											+ menue[n][4]
											+ '">'
											+ menue[n][2]
											+ '</a>';
								}
							}
							html += '</div></div>';
						}
					}
				}
				html += '</div>';
			}
			$menu.append(html);
			$menu.cu_accordion( {
				autoHeight : false
			});
			$(".ad-s").width(width - 30);
			$(".ad-s").cu_accordion( {
				autoHeight : true
			});
			$(".ad-menu>div>a").width(width - 42).css("margin", "10px");
			$menu.find("a").click(function() {
				cu.prompt("加载中...", {
					isLoading : true
				});
				var url = $(this).attr("name");
				$("#cu-load").load(url, {
					data : ""
				}, function() {
				});
			})
		}
	}
	g.creatMenu(json);
}