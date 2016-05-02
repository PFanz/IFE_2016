require.config({
	paths: {
			jquery: '../jslib/jquery',
			jqueryUI: '../jslib/jquery-ui'
	}
});

require(['jquery', 'window'], function($, w){
	$('#a').click(function(){
		new w.Window().alert({
			title: '提示',
			content: 'welcome!',
			width: 300,
			height: 150,
			y: 50,
			hasCloseBtn: true,
			text4AlertBtn: 'ok',
			dragHandle: '.window_header',
			handler4AlertBtn: function(){

			},
			handler4CloseBtn: function(){

			}
		})
	})
})