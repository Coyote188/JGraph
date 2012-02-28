// JavaScript Document
/*

 */
(function($) {
	$.fn.extend( {
		jsonGrid : function(setting) {
			var p = { //默认参数设置
				method : "post",
				url : "url.html",
				dataType : "json",
				width : '700px',
				caption : "表格标题",
				aaa : function() {
					alert("aa")
				}
			};
			var ps = $.extend(p, setting);
			//$(this).click(function(){alert(ps.url);});
			$(this).append("<div id='jsonGrid'></div>");
			var g = {
				getCaption : function(string) { //表格标题显示
					var op = "";
					op = "<p class='p1'>" + string + "</p>";
					$("#jsonGrid").prepend(
							"<div class='caption'>" + op + "</div>");
				},
				getTable : function(json) { //
					var h = {
						page : json.page,
						total : json.total,
						title : json.data.title,
						con : json.data.datas
					}
					$("#jsonGrid").append("<table></table>")
					for ( var i = 0; i < h.con.length + 1; i++) {
						$("#jsonGrid table").append("<tr></tr>")
					}
					for ( var i = 0; i < h.title.length; i++) {
						$("#jsonGrid tr").eq(0).append(
								"<th><p class='bgImageP'></p>" + h.title[i]
										+ "</th>");
					}
					var col = [];
					col = h.con[0];
					for ( var i = 1; i < h.con.length; i++) {
						for ( var j = 0; j < col.length; j++) {
							$("#jsonGrid tr").eq(i).append(
									"<td><p>" + col[j] + "</p></td>");
						}
						col = h.con[i];
					}
					$("#jsonGrid tr").last().remove();
					$("#jsonGrid tr")
							.each(
									function(i) {
										if (i == 0) {
											$(this).prepend("<th></th>");
											$(this).append("<th></th>")
										} else {
											$(this)
													.prepend(
															"<td><input type='checkbox'/></td>");
											$(this)
													.append(
															"<td><p class='edit'>编辑</p><p class='delect'>删除</p></td>")
										}

									})
				},
				getPage : function() {
					var op = "<option value='10' selected='selected'>10</option>";
					for ( var i = 2; i <= 8; i += 2) {
						op += "<option value='" + i + "'>" + i
								+ "&nbsp;&nbsp;</option>";
					}
					$("#jsonGrid").append("<div class='prepage'></div>");
					$("#jsonGrid div.prepage").append(
							"<select class='pageSelect'>" + op + "</select>");
					$("div.prepage").append(
							"<div class='ifPage'></div>"
									+ "<div class='homePage'></div>"
									+ "<div class='pageUp'></div>"
									+ "<div class='pageDown'></div>"
									+ "<div class='lastPage'></div>");
					var totalPage;
					var currentPage;
					var psize = $("#jsonGrid select").val();
					goPage(1, psize);
					$("#jsonGrid select").change(function() {
						psize = $("#jsonGrid select").val();
						goPage(1, psize);
					});
					function goPage(pno, psize) {
						//alert("sdfas")
						totalData = $("#jsonGrid table").find("tr").length;
						var m = totalData - 1;
						//alert(totalData);
						totalPage = 0;//总页数
						var pageSize = psize;//每页显示行数
						if ((totalData - 1) / pageSize > parseInt((totalData - 1)
								/ pageSize)) {
							totalPage = parseInt((totalData - 1) / pageSize) + 1;
						} else {
							totalPage = parseInt((totalData - 1) / pageSize);
						}
						currentPage = pno;//当前页码
						var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行   
						var endRow = currentPage * pageSize + 1;//结束显示的行   
						endRow = (endRow > totalData) ? totalData : endRow;
						$("#jsonGrid tr").each(function(i) {
							if (i >= startRow && i < endRow) {
								$(this).fadeIn("slow");
							} else {
								if (0 == i)
									$(this).fadeIn();
								else
									$(this).hide();
							}
						});
						$("div.prepage .ifPage").html(
								"共查询" + m + "条记录&nbsp;&nbsp;&nbsp;"
										+ currentPage + "/" + totalPage + "页")
					}
					$("div.prepage .pageUp").click(function() {
						if (currentPage > 1) {
							goPage(currentPage - 1, psize);
						}
					});
					$("div.prepage .homePage").click(function() {
						if (currentPage > 1) {
							goPage(1, psize);
						}
					});
					$("div.prepage .pageDown").click(function() {
						if (currentPage < totalPage) {
							goPage(currentPage + 1, psize);
						}
					});
					$("div.prepage .lastPage").click(function() {
						if (currentPage < totalPage) {
							goPage(totalPage, psize);
						}
					});
				},

				getCss : function(width) {
					$("#jsonGrid").width(width);
					$("#jsonGrid tr:even").addClass("bgColor1");
					$("#jsonGrid tr").hover(function() {
						$(this).addClass("trHover")
					}, function() {
						$(this).removeClass("trHover")
					});
				},

				getSort : function() {
					var len = $("#jsonGrid table").find("th").length - 1;
					var $sortOrder = 0;
					$("#jsonGrid tr>th").each(function(i) {
						if (i > 0 && i < len)
							$(this).click(function() {
								$sortOrder = $sortOrder == 0 ? 1 : 0;
								sortTable(i);
								$("#jsonGrid tr").removeClass("bgColor1");
								$("#jsonGrid tr:even").addClass("bgColor1");
							});
					});
					function sortTable(indexs) {
						var arrays = $("#jsonGrid tr").get();
						arrays.shift(); //第一行不是数据行，删除
						arrays = arrays.sort(function(a, b) {
							var keyA = $(a).find("td").eq(indexs).text()
									.toUpperCase();
							var keyB = $(b).find("td").eq(indexs).text()
									.toUpperCase();
							if ($sortOrder == 0) {
								if (keyA < keyB) {
									return -1;
								}
								if (keyA > keyB) {
									return 1;
								}
								return 0;
							} else {
								if (keyA < keyB) {
									return 1;
								}
								if (keyA > keyB) {
									return -1;
								}
								return 0;
							}
						})
						$.each(arrays, function(index, row) {
							$("#jsonGrid table>tbody").append(row); //排列后重新显示
						});
					}
				},
				getdm : function(fn) {
					$("#jsonGrid .edit").click(function() {
						fn();
					})
					$("#jsonGrid .delect").each(function(i) {
						$(this).click(function() {
							var c = confirm("确定要删除本条记录吗？");
							if (c)
								$(this).parent("td").parent("tr").remove();
						})
					})
				}
			}
			g.getCaption(ps.caption);
			g.getTable(ps.jsonTo);
			g.getSort();
			g.getPage();
			g.getCss(ps.width);
			g.getdm(ps.aaa);
			$.ajax( {
				type : ps.method,
				url : ps.url,
				dataType : ps.dataType,
				success : function(data) {
					g.getTable(data);
				},
				error : function() {
					alert("数据传递失败！")
				}
			});
		}
	});
})(jQuery);