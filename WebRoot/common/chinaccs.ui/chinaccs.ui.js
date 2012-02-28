/**
 * @author fddi
 */
var $jq$ = jQuery.noConflict();
var cu = { //ui 超级类
	version : 1.0,
	shade : "<div class='shade'></div>"
};
cu.prompt = function(content, settings) { //提示框
	cu.prompt.close();
	var p = {
		width : 200,
		height : 70,
		isBtn : false,
		isLoading : false,
		btnDo : function() {
		},
		times : 2000

	};
	var ps = $jq$.extend(p, settings);
	var g = {
		show : function() {
			this.addNote();
			var w_w = $jq$(window).width();
			var w_h = $jq$(window).height();
			var p_w = $jq$(".prompt").width();
			var p_h = $jq$(".prompt").height();
			$jq$(".prompt_main").html("<p>" + content + "</p>");
			if (ps.isBtn) { //带按钮的提示框
				if (w_w < p_w || w_h < p_h) {
					$jq$(".prompt").css( {
						left : 50,
						top : 50
					});
				} else {
					$jq$(".prompt").css( {
						left : (w_w - p_w) / 2,
						top : $jq$(window).scrollTop() + (w_h - p_h) / 2
					});
				}
				$jq$(".prompt").show();
				$jq$(".shade").show();
				return;
			}
			$jq$(".prompt").css( {
				opacity : 0.8,
				left : (w_w - p_w) / 2
			});
			$jq$(".prompt_main").css("opacity", "1");
			if (ps.isLoading) { //等待画面
				$jq$(".prompt_main").append("<div class='prompt_loading'></div>");
				$jq$(".prompt").fadeIn();
				return;
			}
			$jq$(".prompt").css("minHeight", "40px").fadeIn();
			setTimeout("cu.prompt.close()", ps.times);
		},
		addNote : function(width) {
			var html = "<div class='prompt'>"
					+ "<div class='prompt_main'></div></div>";
			$jq$("body").append(html);
			if (ps.isBtn) {
				$jq$(".prompt").width(ps.width).height(ps.height);
				$jq$(".prompt_main").height(ps.height);
				$jq$(".prompt").height(ps.height + 30).width(ps.width + 50);
				$jq$(".prompt").append("<div class='prompt_footer'></div>");
				html = "<input type='button' class='button' id='prompt_ok' value='确定' />"
						+ "<input type='button' class='button' id='prompt_cancel' value='取消' />";
				$jq$(".prompt_footer").append(html);
				$jq$("#prompt_ok").click(function() {
					$jq$('.prompt').fadeOut().remove();
					$jq$('.shade').hide();
					ps.btnDo();
				});
				$jq$("#prompt_cancel").click(function() {
					$jq$('.prompt').fadeOut().remove();
					$jq$('.shade').hide();
				});
			}
		}
	}
	g.show();
}

cu.info = function(content) {
	cu.prompt(content, 2000);
}
cu.load = function(content) {
	cu.prompt(content, {
		isLoading : true,
		height : 75
	});
}
cu.prompt.close = function() {
	$jq$('.prompt').fadeOut().remove();
	$jq$('.shade').hide();
}

cu.pop = function(settings) { //弹出窗口
	var p = {
		width : 350,
		height : 350,
		popID : 'pop_id',
		caption : '标题',
		serverLoad : false,
		url : 'url',
		data : null,
		content : "content_id",
		closeDo : function() {
		}
	}
	var ps = $jq$.extend(p, settings);
	var $jq$pop = {}; //窗口对象
	var g = {
		show : function() {
			g.addNote();
			g.addContent();
			g.setDrag();
		},
		addContent : function() { //加载内容
			if (ps.serverLoad) {
				$jq$pop.find(".pop_content").load(ps.url, ps.data, function() {
				});
				return;
			}
			var content = $jq$("#" + ps.content).html();
			$jq$pop.find(".pop_content").html(content);
		},
		setDrag : function() { //拖拽效果
			var drag = false;
			var w_w = $jq$(window).width();
			var w_h = $jq$(window).height();
			var p_w = $jq$pop.width();
			var p_h = $jq$pop.height();
			$jq$pop.find(".pop_caption").mousedown(function(e) {
				drag = true;
				var ol = $jq$pop.offset().left;
				var ot = $jq$pop.offset().top;
				var moveX = e.clientX - ol;
				var moveY = e.clientY - ot;
				$jq$(this).mousemove(function(e) {
					if (drag) {
						var x = e.clientX - moveX;
						var y = e.clientY - moveY;
						if (x < 0) {
							x = 0;
						}
						if (y < 0) {
							y = 0;
						}
						$jq$pop.css( {
							left : x,
							top : y,
							margin : "auto"
						});

					}
				})
				$jq$pop.find(".pop_caption").mouseup(function() {
					drag = false;
				})

			});
		},
		addNote : function() {
			var html = "<div id='" + ps.popID
					+ "' class='pop'><div class='pop_caption'>"
					+ "<h2></h2><span class='pop_close'></span></div>"
					+ "<div class='pop_content'></div>"
					+ "<div class='pop_footer'></div></div>";
			$jq$("body").append(html);
			$jq$pop = $jq$("#" + ps.popID);
			$jq$pop.width(ps.width).height(ps.height);
			var w_w = $jq$(window).width();
			var w_h = $jq$(window).height();
			var p_w = $jq$pop.width();
			var p_h = $jq$pop.height();
			$jq$pop.find(".pop_caption h2").text(ps.caption);
			$jq$pop.find(".pop_content").height($jq$pop.height() - 65).width(
					$jq$pop.width() - 10);
			if (w_w < p_w || w_h < p_h) {
				$jq$pop.css( {
					opacity : 1,
					left : 50,
					top : 50
				});
			} else {
				$jq$pop.css( {
					opacity : 1,
					left : (w_w - p_w) / 2,
					top : $jq$(window).scrollTop() + (w_h - p_h) / 2
				});
			}
			$jq$pop.find(".pop_close").click(function() {
				$jq$pop.remove();
				ps.closeDo();
				//cu.prompt("关闭窗口");
				});
			$jq$pop.show();
		}
	}
	g.show();
}

cu.fullLoad = function() {
	$jq$('.shade').show();
	$jq$("body").append("<div class='full_load'></div>");
	$jq$(".full_load").css( {
		opacity : 1,
		left : ($jq$(window).width() - 100) / 2,
		top : $jq$(window).scrollTop() + ($jq$(window).height() - 10) / 2
	});
}

cu.layout = function() {
	var w_w = $jq$(document).width();
	var w_h = $jq$(document).height();
	//cu.info("w" + w_w + "/h" + w_h);
	var mainHeight = w_h - $jq$("#cu-header").height() - $jq$("#cu-footer").height()
			- 6;
	$jq$("#cu-main").css("height", mainHeight);
	$jq$("#cu-layout-left").height($jq$("#cu-main").height());
	$jq$("#layout-left-bar").height($jq$("#cu-main").height());
	$jq$("#cu-content").height($jq$("#cu-main").height());
	$jq$("#cu-menu").height($jq$("#cu-main").height() - 31);
	$jq$("#cu-footer").css("top",
			$jq$("#cu-header").height() + $jq$("#cu-main").height()+2);
}

cu.leftLayout = function() {
	var content_width = $jq$("#cu-main").width()
			- $jq$("#cu-layout-left").outerWidth() - 2;
	$jq$("#cu-content").width(content_width);
	$jq$("#cu-main").append("<div id='layout-left-bar'><span></span></div>");
	$jq$("#layout-left-bar").height($jq$("#cu-main").height());
	var width = $jq$("#cu-layout-left").width();
	$jq$("#cu-layout-left").height($jq$("#cu-main").height());
	$jq$("#cu-layout-left").find(".cu-caption span").hover(function() {
		$jq$(this).css( {
			"background-position" : "-16px -32px"
		});

	}, function() {
		$jq$(this).css( {
			"background-position" : "-16px 0px"
		});
	}).click(function() {
		$jq$("#cu-layout-left").animate( {
			left : -width
		}, 500).attr("cu-hide", "hide");
		$jq$("#layout-left-bar").show(1000);
		content_width = $jq$("#cu-main").width() - 34;
		$jq$("#cu-content").animate( {
			left : 33,
			width : content_width
		}, 500);
	});
	$jq$("#layout-left-bar").hover(function() {
		$jq$(this).css( {
			"background" : "#e8e8e8"
		});
	}, function() {
		$jq$(this).css( {
			"background" : "#f2f2f2"
		});
	});
	$jq$("#layout-left-bar span").hover(function() {
		$jq$(this).css( {
			"background-position" : "-16px -48px"
		});

	}, function() {
		$jq$(this).css( {
			"background-position" : "-16px -16px"
		});
	}).click(
			function() {
				$jq$("#cu-layout-left").animate( {
					left : 0
				}, 500).attr("cu-hide", "");
				$jq$("#layout-left-bar").hide("fast");
				var content_width = $jq$("#cu-main").width()
						- $jq$("#cu-layout-left").width() - 4;
				$jq$("#cu-content").animate( {
					left : 203,
					width : content_width
				}, 500);
			});

}

cu.list = function(id, json) {
	var $jq$list = $jq$("#" + id);
	$jq$list.addClass("cu-list");
}

$jq$(function() {
	$jq$("body").prepend(cu.shade);
	$jq$(".shade").css( {
		"min-width" : $jq$(document).width(),
		"min-height" : $jq$(document).height()
	})
	cu.layout();
	cu.leftLayout();
});
$jq$(window).resize(
		function() {
			cu.layout();
			if ($jq$("#cu-layout-left").attr("cu-hide") == "hide") {
				var content_width = $jq$("#cu-main").width() - 34;
				$jq$("#cu-content").width(content_width);
			} else {
				var content_width = $jq$("#cu-main").width()
						- $jq$("#cu-layout-left").width() - 4;
				$jq$("#cu-content").width(content_width);
			}
		})