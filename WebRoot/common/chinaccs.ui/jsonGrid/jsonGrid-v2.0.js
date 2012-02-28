// JavaScript Document
/*
 *
 */
(function($) {
	$.fn
			.extend( {
				jsonGrid : function(setting) {
					var p = { //默认参数设置
						method : "post",
						url : "url.html",
						output : "jsonGrid='nothing'",
						width : '500px',
						caption : "表格标题",
						perSize : "10",
						start : "0",
						isCheckBox : false,
						isClick : false,
						clickDo : function(pm) {
							//alert(pm);
					}
					};
					var ps = $.extend(p, setting);
					$(this).empty();
					$(this).append("<div class='jsonGrid'>数据载入中....</div>");
					var $jsonGrid = $(this).find(".jsonGrid");
					$jsonGrid.width(ps.width);
					$jsonGrid.append("<div class='info'>数据载入中....</div>");
					var g = {

						//表格标题显示
						getCaption : function(string) {
							var op = "";
							op = "<p class='p1'>" + string + "</p>";
							$jsonGrid.prepend("<div class='caption'>" + op
									+ "</div>");
						},

						//构建Table界面，解析json数据显示；
						getTable : function(json) {
							if (0 != json.result) { //请求数据失败时
								alert(json.msg);
								$jsonGrid.html("<p class='pMsg'>" + json.msg
										+ "</p>");
								g.getCaption(ps.caption);
								return;
							}
							var h = {
								title : json.data.head,
								con : json.data.body
							}
							var colNum = h.title.length;
							$jsonGrid.html("");
							g.getCaption(ps.caption);
							$jsonGrid.append("<table></table>");
							var $table = $jsonGrid.find("table");
							for ( var i = 0; i < h.con.length + 1; i++) {
								$table.append("<tr></tr>")
							}
							if (ps.isCheckBox)//增加复选框列
								$table.find("tr").eq(0).append(
										"<th class='wrap'></th>");
							for ( var i = 0; i < h.title.length; i++) {
								$table.find("tr").eq(0).append(
										"<th><div class='bgImageP'></div>"
												+ h.title[i] + "</th>");
							}

							var col = [];
							//col = h.con[0];
							for ( var i = 1; i < h.con.length + 1; i++) {
								col = h.con[i - 1];
								if (ps.isCheckBox) {//增加每行的复选框
									$table
											.find("tr")
											.eq(i)
											.append(
													"<td><input id='data_id'"
															+ i
															+ " name='id' type='checkbox' value='"
															+ col[0]
															+ "'/></td>");
								}
								for ( var j = 0; j < colNum; j++) {
									$table.find("tr").eq(i).append(
											"<td><p>"
													+ (null == col[j] ? ""
															: col[j])
													+ "</p></td>");
								}
							}
							if (ps.isClick) {
								$table
										.find("tr")
										.each(
												function() {
													$(this).css("cursor",
															"pointer");
													if (ps.isCheckBox) {
														$(this).find("th")
																.eq(0).hide();
														$(this).find("td")
																.eq(0).hide();
													} else {
														$(this).find("th")
																.eq(0).hide();
														$(this).find("td")
																.eq(0).hide();
													}
													$(this)
															.click(
																	function() {
																		var id = $(
																				this)
																				.find(
																						"td")
																				.eq(
																						0)
																				.text();
																		var name = $(
																				this)
																				.find(
																						"td")
																				.eq(
																						1)
																				.text();
																		var pm = {
																			id : id,
																			name : name
																		};
																		ps
																				.clickDo(pm);
																	})
												})
							}
							if (ps.isCheckBox) {
								$table.find("tr").each(function() {
									$(this).find("th").eq(1).hide();
									$(this).find("td").eq(1).hide();
								})
							}
						},
						getPage : function(json, psize) { //分页处理；
							var h = {
								total : json.data.total,
								start : json.data.start
							};
							op = "<option value='1' selected='selected'>"
									+ psize + "</option>";
							var psp = true;
							for ( var i = 10; i <= 40; i += 10) {
								if (psize == ps.perSize || i == ps.perSize)
									psp = false;
								if (i == psize)
									continue;
								op += "<option value='" + i + "'>" + i
										+ "&nbsp;&nbsp;</option>";
							}
							if (psp)
								op += "<option value='" + ps.perSize + "'>"
										+ ps.perSize + "&nbsp;&nbsp;</option>";
							$jsonGrid.append("<div class='prepage'></div>");
							$jsonGrid.find("div.prepage").append(
									"<select class='pageSelect'>" + op
											+ "</select>");
							$jsonGrid
									.find("div.prepage")
									.append(
											"<div class='ifPage'></div>"
													+ "<div class='homePage'></div>"
													+ "<div class='pageUp'></div>"
													+ "<div class='pageDown'></div>"
													+ "<div class='lastPage'></div>"
													+ "<div class='girdRefresh' alt='刷新'><span></span></div>");
							$jsonGrid.find(".pageUp").click(function() {//上一页
										var start = parseInt(h.start)
												- parseInt(psize);
										if (0 == start) {
											call.call(0, psize);
										} else if (0 > start) {
											alert("已经是第一页了");
											h.start = 0;
										} else {
											call.call(start, psize);
										}
									});
							$jsonGrid.find(".homePage").click(function() {//第一页
										if (h.start == 0) {
											alert("已经是第一页了");
										} else {
											call.call(0, psize);
										}

									});
							$jsonGrid
									.find(".pageDown")
									.click(function() {//下一页					
												var start = (parseInt(h.start) + parseInt(psize));
												if (1 < (h.total / start)) {
													call.call(start, psize);
												} else {
													alert("已经到了最后一页");
												}
											});
							$jsonGrid
									.find(".lastPage")
									.click(function() {//最后一页
												var start = 0;
												if (parseInt(h.total)
														% parseInt(psize) == 0) {
													start = parseInt(h.total)
															- parseInt(psize);
												} else {
													start = parseInt(h.total)
															- parseInt(h.total)
															% parseInt(psize);
												}
												if (h.total <= psize) {
													alert("已经到了最后一页");
												} else if (h.total / h.start <= 2) {
													alert("已经到了最后一页");
												} else {
													call.call(start, psize);
												}
											});
							var pagenum;
							if (h.total >= psize && h.total % psize == 0) {
								pagenum = parseInt(h.total / psize);
							} else {
								pagenum = parseInt(h.total / psize) + 1;
							}
							var currentPage = parseInt(h.start / psize) + 1;

							$jsonGrid.find(".ifPage")
									.html(
											"共" + h.total
													+ "条记录&nbsp;&nbsp;&nbsp;"
													+ currentPage + "/"
													+ pagenum + "页")

							$jsonGrid.find(".girdRefresh").click(function() { //刷新按钮；
										call.call(0, psize);
									})
							$jsonGrid.find(".girdRefresh").hover(function() {

								$(this).css("border", "1px solid #369");
							}, function() {
								$(this).css("border", "0px");
							})
							$jsonGrid
									.find(".pageSelect")
									.change(function() { //自选显示行数；
												var autopsize = $jsonGrid.find(
														"select").val();
												call.call(0, autopsize);
												$jsonGrid
														.find(".pageSelect")
														.append(
																"<option value='"
																		+ ps.perSize
																		+ "'>"
																		+ ps.perSize
																		+ "&nbsp;&nbsp;</option>")
											})
						},
						getCss : function(width) {
							$jsonGrid.width(width);
							$jsonGrid.find("tr:even").addClass("bgColor1");
							$jsonGrid.find("tr").hover(function() {
								$(this).addClass("trHover")
							}, function() {
								$(this).removeClass("trHover")
							});
						},
						getSort : function() { //排序功能的实现；
							var len = $jsonGrid.find("table th").length - 1;
							var $sortOrder = 0;
							$jsonGrid
									.find("tr>th")
									.each(
											function(i) {
												if (i > 0 && i < len)
													$(this)
															.click(
																	function() {
																		$sortOrder = $sortOrder == 0 ? 1
																				: 0;
																		sortTable(i);
																		$jsonGrid
																				.find(
																						"tr")
																				.removeClass(
																						"bgColor1");
																		$jsonGrid
																				.find(
																						"tr:even")
																				.addClass(
																						"bgColor1");
																	});
											});
							function sortTable(indexs) {
								var arrays = $jsonGrid.find("tr").get();
								arrays.shift();
								arrays = arrays.sort(function(a, b) {
									var keyA = $(a).find("td").eq(indexs)
											.text().toUpperCase();
									var keyB = $(b).find("td").eq(indexs)
											.text().toUpperCase();
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
									$jsonGrid.find("table>tbody").append(row);
								});
							}
						}
					}
					var call = { //远程调用
						call : function(start, perSize) {
							var output = ps.output + "&start=" + start
									+ "&persize=" + perSize;
							$jsonGrid.find(".info").ajaxStart(function() {
								$(this).show();
							});
							$jsonGrid.find(".info").ajaxStop(function() {
								$(this).hide();
							});
							$
									.ajax( {
										type : ps.method,
										url : ps.url,
										dataType : ps.dataType,
										data : output,
										success : function(json) {
											alert(json);
											var data = jQuery
													.parseJSON(json.output);
											g.getTable(data);
											g.getPage(data, perSize);
											g.getSort();
											g.getCss(ps.width);
										},
										error : function() {
											$jsonGrid
													.html("<p class='pMsg'>数据传递失败！</p>");
										}
									});
						}
					};
					g.getCaption(ps.caption)
					call.call(ps.start, ps.perSize);
				}
			});
})(jQuery);