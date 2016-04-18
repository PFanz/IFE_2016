/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var area = document.getElementById('aqi-city-input').value;
	var number = document.getElementById('aqi-value-input').value;
	if( area!='' && !isNaN(parseFloat(number)) ){
		aqiData[area] = number;
	} else {
		alert('请填写正确数据');
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	var str = '';
	str += '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	for(data in aqiData){
		str += '<tr><td>'+data+'</td><td>'+aqiData[data]+'</td><td><button>删除</button></td></tr>';
	}
	table.innerHTML = str ;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  if(event.srcElement.innerHTML == '删除'){
  		var node = event.srcElement;
  		var data = node.parentNode.previousSibling.previousSibling.innerHTML;
  		delete(aqiData[data]);
  	}
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  
  	if (window.addEventListener) {
		 document.getElementById('add-btn').addEventListener('click', addBtnHandle);
	} else if (window.attachEvent) {
		 document.getElementById('add-btn').attachEvent('onclick', addBtnHandle);
	}
  	
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	var table = document.getElementById('aqi-table');
 	table.onclick = delBtnHandle ;
}

init();