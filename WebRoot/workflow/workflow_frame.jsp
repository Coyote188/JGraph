<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link href="../common/plug-ins/css/webflow.css" rel="stylesheet" type="text/css" />
<script charset="UTF-8" src="../common/chinaccs.ui/jquery-1.6.min.js" type="text/javascript"></script>
<script charset="UTF-8" type="text/javascript">
var pages = ["../workflow/pages/workplan_wel.jsp","../workflow/pages/workplan_config.jsp",
	"../workflow/pages/workplan_qResult.jsp",
	"../workflow/pages/workplan_recode.jsp",
	"../workflow/pages/workplan_complete.jsp"];
var init = 0;
$(document).ready(function(){
	loadPg(pages[0]);
	loadLastPg();
	$("#btnStepOver").attr("disabled","disabled");
	$("#btnStepNext").click(function(){
		init++;
		fnForward();
		$("#webflow_content").html="";
		loadPg(pages[init]);
		loadLastPg();
	});
	$("#btnStepOver").click(function(){
		$("#webflow_content").html="";
		--init;
		fnBackward();
		loadPg(pages[init]);
		loadLastPg();
	});
	$("#btnComplete").click(function(){
		if(confirm("是否确定结束配置？")){
			loadPg(pages[pages.length-1]);
		}
	});
});
function loadPg(url){
	$("#webflow_content").load(url, function(response, status, xhr) {
		if (status == "error") {
			$("#pop_msg").css("visibility","visible");
			$("#pop_msg").html("WebFlow Loding Error:" + xhr.statusText + " : " + xhr.status);
			setTimeout(function(){$("#pop_msg").css("visibility","hidden");},1000)
		}
	});
}
function loadLastPg(){
	if(pages[init+1] == null){
		$("#btnStepNext").attr("disabled","disabled");
	}else{
		$("#btnStepNext").attr("disabled",false);
	}
	if(init == 1){
		$("#btnStepOver").attr("disabled","disabled");
	}else{
		$("#btnStepOver").attr("disabled",false);
	}
}
function fnForward(){
	
}
function fnBackward(){
	
}
</script>
</head>
<body>
<div class="workplan_title">
● DCN作业计划
</div>
<div class="full_screen">
	<div id="webflow_content">
	</div>
	<div id="webflow_bottom_button">
		<button id="btnStepOver">上一步</button>
		<button id="btnStepNext">下一步</button>
		<button id="btnComplete">完成</button>
		<button id="btnCancel">取消</button>
	</div>
</div>
<div id="pop_msg">

</div>
</body>
</html>