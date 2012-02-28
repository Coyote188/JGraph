/**
 * @author fddi
 */
var $jq$ = jQuery.noConflict();

(function($jq$) {
	$jq$.fn
			.extend( {
				jsonGrid : function(setting) {
					var p = { //默认参数设置
						method : "post",
						url : "url.html",
						input : "json",
						width : '500px',
						caption : "表格标题",
						persize : "1000",
						start : "0",
						isCheckBox : false,
						isClick : false,
						clickName : "操作",
						clickDo : function(pm) {
							//单击记录时触发的事件
					}
					};
					var value = 0;
					var ps = $jq$.extend(p, setting);
					$jq$(this).empty();
					$jq$(this).append("<div class='jsonGrid'>数据载入中....</div>");
					var $jq$jsonGrid = $jq$(this).find(".jsonGrid");
					$jq$jsonGrid.width(ps.width);
					$jq$jsonGrid.append("<div class='info'>数据载入中....</div>");
					var g = {//表格标题显示						
						getCaption : function(string) {
							var op = "";
							op = "<p class='p1'>" + string + "</p>";
							$jq$jsonGrid.prepend("<div class='caption'>" + op
									+ "</div>");
						},
						getTable : function(json) {//构建Table界面，解析json数据显示；
							if (0 != json.result) { //请求数据失败时
								cu.info(json.msg);
								$jq$jsonGrid.html("<p class='pMsg'>" + json.msg
										+ "</p>");
								g.getCaption(ps.caption);
								return;
							}
							var h = {
								title : json.head,
								con : json.data
							};
							var colNum = h.title.length;
							$jq$jsonGrid.html("");
							g.getCaption(ps.caption);
							$jq$jsonGrid.append("<table></table>");
							var $jq$table = $jq$jsonGrid.find("table");
							for ( var i = 0; i < h.con.length + 1; i++) {
								$jq$table.append("<tr></tr>");
							}
							$jq$table
									.find("tr")
									.eq(0)
									.append(
											"<th class='wrap' width='30' align='center'>选择</th>");
							for ( var i = 0; i < h.title.length; i++) {
								$jq$table.find("tr").eq(0).append(
										"<th><div class='bgImageP'></div>"
												+ h.title[i] + "</th>");
							}
							var col = [];
							for ( var i = 1; i < h.con.length + 1; i++) {
								col = h.con[i - 1];
								$jq$table
										.find("tr")
										.eq(i)
										.append(
												"<td align='center'><input id='"
														+ col[0]
														+ "' name='grid_ck'class='jsonGrid_check' type='checkbox' value='"
														+ col[0] + "'/></td>");
								for ( var j = 0; j < colNum; j++) {
									if(j == 0 ){
										$jq$table
											.find("tr")
											.eq(i)
											.append("<td><p style='text-decoration:underline;cursor:pointer' onclick='viewInfo(\"" + col[j] + "\")'>" + (null == col[j] ? "" : col[j]) + "</p></td>");
									} else if(j == 1){
										$jq$table
											.find("tr")
											.eq(i)
											.append("<td><p style='text-decoration:underline;cursor:pointer'>" + (null == col[j] ? "" : col[j]) + "</p></td>");
									} else{
										$jq$table
											.find("tr")
											.eq(i)
											.append("<td><p style='text-decoration:underline;cursor:pointer'>" + (null == col[j] ? "" : col[j]) + "</p></td>");
									}
									
								}
							}
							var count = 0;
							$jq$table
									.find("tr")
									.each(
											function() {
												$jq$(this).css("cursor",
														"pointer");
												if (ps.isCheckBox) {
													$jq$(this).find("th").eq(0)
															.show();
													$jq$(this).find("td").eq(0)
															.show();
												} else {
													$jq$(this).find("th").eq(0)
															.hide();
													$jq$(this).find("td").eq(0)
															.hide();
												}
												if (ps.isClick) {
													if (0 == count++) {
														$jq$(this).append(
																'<th>操作</th>');
													} else {
														$jq$(this)
																.append(
																		'<td id="op"><p>' + ps.clickName + '</p></td>');
														var id = $jq$(this)
																.find("td")
																.find(
																		"input[type=checkbox]")
																.val();
														$jq$(this)
																.find(
																		'td[id=op]')
																.click(
																		function() {
																			var pm = {
																				id : id
																			};
																			ps
																					.clickDo(pm);
																		});
													}
												}
											});
						},
						getCss : function(width) {
							$jq$jsonGrid.width(width);
							$jq$jsonGrid.find("tr:even").addClass("bgColor1");
							$jq$jsonGrid.find("tr").hover(function() {
								$jq$(this).addClass("trHover");
							}, function() {
								$jq$(this).removeClass("trHover");
							});
						},
						getSort : function() { //排序功能的实现；
							var len = $jq$jsonGrid.find("table th").length - 1;
							var $jq$sortOrder = 0;
							$jq$jsonGrid
									.find("tr>th")
									.each(
											function(i) {
												if (i > 0 && i < len)
													$jq$(this)
															.click(
																	function() {
																		$jq$sortOrder = $jq$sortOrder == 0 ? 1
																				: 0;
																		sortTable(i);
																		$jq$jsonGri
																				.find(
																						"tr")
																				.removeClass(
																						"bgColor1");
																		$jq$jsonGrid
																				.find(
																						"tr:even")
																				.addClass(
																						"bgColor1");
																	});
											});
							function sortTable(indexs) {
								var arrays = $jq$jsonGrid.find("tr").get();
								arrays.shift();
								arrays = arrays.sort(function(a, b) {
									var keyA = $jq$(a).find("td").eq(indexs)
											.text().toUpperCase();
									var keyB = $jq$(b).find("td").eq(indexs)
											.text().toUpperCase();
									if ($jq$sortOrder == 0) {
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
								});
								$jq$.each(arrays, function(index, row) {
									$jq$jsonGrid.find("table>tbody")
											.append(row);
								});
							}
						}
					};
					var call = { //远程调用
						call : function(start, persize) {
							var input = ps.input + "&start=" + start
									+ "&persize=" + persize;
							$jq$jsonGrid.find(".info").ajaxStart(function() {
								$jq$(this).show();
							});
							$jq$jsonGrid.find(".info").ajaxStop(function() {
								$jq$(this).hide();
							});
							$jq$
									.ajax( {
										type : ps.method,
										url : ps.url,
										dataType : ps.dataType,
										data : input,
										success : function(json) {
											var data;
											try {
												data = jQuery
														.parseJSON(json.output);
											} catch (e) {
												alert(e);
											}
											g.getTable(data);
											//g.getPage(data, persize);
											g.getSort();
											g.getCss(ps.width);
										},
										error : function() {
											$jq$jsonGrid
													.html("<p class='pMsg'>数据传递失败！</p>");
										}
									});
						}
					};
					g.getCaption(ps.caption);
					call.call(ps.start, ps.persize);
				}
			});
})(jQuery);