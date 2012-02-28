/**
 * @author fddi
 */
var $jq$ = jQuery.noConflict();

(function($jq$) {
	$jq$.fn.extend( {
		jsonGrid : function(setting) {
			var p = { //默认参数设置
				method : "post",
				url : "url.html",
				input : "json",
				width : '500px',
				caption : "表格标题",
				persize : "10",
				start : "0",
				isCheckBox : false,
				isClick : false,
				clickName:"操作",
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
					op = "<p class='p1'>"+string+"</p>";
					$jq$jsonGrid.prepend("<div class='caption'>"+op+"</div>");
				},						
				getTable : function(json) {//构建Table界面，解析json数据显示；
					if (0 != json.result) { //请求数据失败时
						cu.info(json.msg);
						$jq$jsonGrid.html("<p class='pMsg'>"+json.msg+"</p>");
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
					$jq$table.find("tr").eq(0).append("<th class='wrap' width='30' align='center'>选择</th>");
					for ( var i = 0; i < h.title.length; i++) {
						$jq$table.find("tr").eq(0).append("<th><div class='bgImageP'></div>"+h.title[i]+"</th>");
					}
					var col = [];
					for ( var i = 1; i < h.con.length + 1; i++) {
						col = h.con[i - 1];
						$jq$table.find("tr").eq(i).append("<td align='center'><input id='"+col[0]+"' name='grid_ck'class='jsonGrid_check' type='checkbox' value='"+col[0]+"'/></td>");
						for ( var j = 0; j < colNum; j++) {
							$jq$table.find("tr").eq(i).append("<td><p>"+(null==col[j]?"":col[j])+"</p></td>");
						}
					}
					var count = 0;
					$jq$table.find("tr").each(function() {
						$jq$(this).css("cursor","pointer");
						if (ps.isCheckBox) {
							$jq$(this).find("th").eq(0).show();
							$jq$(this).find("td").eq(0).show();
						} else {
							$jq$(this).find("th").eq(0).hide();
							$jq$(this).find("td").eq(0).hide();
					    }
						if (ps.isClick) {
							if(0==count++){
								$jq$(this).append('<th>操作</th>');
							} else {
								$jq$(this).append('<td id="op"><p>'+ps.clickName+'</p></td>');
								var id = $jq$(this).find("td").find("input[type=checkbox]").val();
								$jq$(this).find('td[id=op]').click(function(){
									var pm = {id : id};
									ps.clickDo(pm);
								});
							}
						}
					});
				},
				getPage : function(json, psize) { //分页处理；
					var h = {
						total : json.total,
						start : json.start
					};
					op = "<option value='1' selected='selected'>"+psize+"</option>";
					var psp = true;
					for ( var i = 10; i <= 40; i += 10) {
						if (psize == ps.persize || i == ps.persize)
							psp = false;
						if (i == psize)
							continue;
						op += "<option value='"+i+"'>"+i+"&nbsp;&nbsp;</option>";
					}
					if (psp){op +="<option value='"+ps.persize + "'>"+ps.persize+"&nbsp;&nbsp;</option>";}
					$jq$jsonGrid.append("<div class='prepage'></div>");
					$jq$jsonGrid.find("div.prepage").append("<select class='pageSelect'>"+op+"</select>");
					$jq$jsonGrid.find("div.prepage").append("<div class='ifPage'></div>"
											+ "<div class='homePage'></div>"
											+ "<div class='pageUp'></div>"
											+ "<div class='pageDown'></div>"
											+ "<div class='lastPage'></div>"
											+ "<div class='girdRefresh' alt='刷新'><span></span></div>");
					$jq$jsonGrid.find(".pageUp").click(function() {//上一页
						var start = parseInt(h.start)-parseInt(psize);
						if (0 == start) {
							call.call(0, psize);
						} else if (0 > start) {
							cu.info("已经是第一页了");
							h.start = 0;
						} else {
							call.call(start, psize);
						}
					});
					$jq$jsonGrid.find(".homePage").click(function() {//第一页
						if (h.start == 0) {
							cu.info("已经是第一页了");
						} else {
							call.call(0, psize);
						}

					});
					$jq$jsonGrid.find(".pageDown").click(function() {//下一页					
						var start = (parseInt(h.start) + parseInt(psize));
						if (1 < (h.total / start)) {
							call.call(start, psize);
						} else {
							cu.info("已经到了最后一页");
						}
					});
					$jq$jsonGrid.find(".lastPage").click(function() {//最后一页
						var start = 0;
						if (parseInt(h.total)%parseInt(psize) == 0) {
							start = parseInt(h.total)-parseInt(psize);
						} else {
							start = parseInt(h.total)-parseInt(h.total)%parseInt(psize);
						}
						if (parseInt(h.total) <= parseInt(psize)) {
							cu.info("已经到了最后一页");
						} else if (parseInt(h.total)/ parseInt(h.start) <= 2) {
							cu.info("已经到了最后一页");
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

					$jq$jsonGrid.find(".ifPage").html("共"+h.total+"条记录&nbsp;&nbsp;&nbsp;"+currentPage+"/"+pagenum+"页");

					$jq$jsonGrid.find(".girdRefresh").click(function() { //刷新按钮；
						call.call(0, psize);
					});
					$jq$jsonGrid.find(".girdRefresh").hover(function() {
						$jq$(this).css("border", "1px solid #369");
					}, function() {
						$jq$(this).css("border", "0px");
					});
					$jq$jsonGrid.find(".pageSelect").change(function() { //自选显示行数；
						var autopsize = $jq$jsonGrid.find("select").val();
						call.call(0, autopsize);
						$jq$jsonGrid.find(".pageSelect").append("<option value='"
								+ps.perSize+"'>"+ps.perSize+"&nbsp;&nbsp;</option>");
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
					$jq$jsonGrid.find("tr>th").each(function(i) {
						if (i>0&&i<len)
							$jq$(this).click(function(){$jq$sortOrder=$jq$sortOrder==0?1:0;
								sortTable(i);
								$jq$jsonGri.find("tr").removeClass("bgColor1");
								$jq$jsonGrid.find("tr:even").addClass("bgColor1");
							});
					});
					function sortTable(indexs) {
						var arrays = $jq$jsonGrid.find("tr").get();
						arrays.shift();
						arrays = arrays.sort(function(a, b) {
							var keyA = $jq$(a).find("td").eq(indexs).text().toUpperCase();
							var keyB = $jq$(b).find("td").eq(indexs).text().toUpperCase();
							if ($jq$sortOrder == 0) {
								if (keyA < keyB) {return -1;}
								if (keyA > keyB) {return 1;}
								return 0;
							} else {
								if (keyA < keyB) {return 1;}
								if (keyA > keyB) {return -1;}
								return 0;
							}
						});
						$jq$.each(arrays, function(index, row) {
							$jq$jsonGrid.find("table>tbody").append(row);
						});
					}
				}
			};
			var call={ //远程调用
				call:function(start, persize) {
					var input = ps.input+"&start="+start+"&persize="+persize;
					$jq$jsonGrid.find(".info").ajaxStart(function() {
						$jq$(this).show();
					});
					$jq$jsonGrid.find(".info").ajaxStop(function() {
						$jq$(this).hide();
					});
					$jq$.ajax( {
						type : ps.method,
						url : ps.url,
						dataType : ps.dataType,
						data : input,
						success : function(json) {
							var data;
							try {
								data = jQuery.parseJSON(json.output);
							} catch (e) {
								alert(e);
							}
							g.getTable(data);
							g.getPage(data, persize);
							g.getSort();
							g.getCss(ps.width);
						},
						error : function() {
							$jq$jsonGrid.html("<p class='pMsg'>数据传递失败！</p>");
						}
					});
				}
			};
			g.getCaption(ps.caption);
			call.call(ps.start, ps.persize);
		}
	});
})(jQuery);