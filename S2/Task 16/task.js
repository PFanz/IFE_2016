/**
 * Created by Gong on 2016/3/22.
 */
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

    var cityName = document.getElementById('aqi-city-input').value.trim().replace('/\s/', ''),
        aqiValue = document.getElementById('aqi-value-input').value.trim().replace('/\s/', '');

    if(!/^[A-Za-z\u4E00-\u9FA5]+$/.test(cityName)) {
        alert('城市名必须为中英文');
        return;
    }
    if(!/^\d+$/.test(aqiValue)) {
        alert('AQI数值必须为整数');
        return;
    }

    aqiData[cityName] = aqiValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var item,
        html = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>',
        table = document.getElementById('aqi-table');
    for(item in aqiData) {
        html += '<tr>' +
                    '<td>' + item + '</td>' +
                    '<td>' + aqiData[item] + '</td>' +
                    '<td><button data-city="' + item + '">删除</button></td>' +
                '</tr>';
    }

    table.innerHTML = html;
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
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById('add-btn').addEventListener('click', addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById('aqi-table').addEventListener('click', function(e) {

        var event = window.event || e,
            target = event.target;
        if(target.tagName.toLowerCase() === 'button') {
            delBtnHandle(target.dataset.city);
        }

    })
}

init();