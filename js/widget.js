// (function(){
	var Widget = function Widget(){
		this.boundingBox = null;
	}

	Widget.prototype = {
		// 绑定事件方法
		on: function(type, handler){
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		// 触发事件方法
		fire: function(type, data){
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i=0,len=handlers.length; i<len; i++){
					handlers[i](data);
				}
			}
		},
		// 初始化
		render: function(container){
			this.renderUI();
			document.querySelector(container || 'body').appendChild(this.boundingBox);
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			
		},
		// 销毁
		destroy: function(){
				this.destructor();
				// 取消绑定事件
				document.querySelector('.modal').remove();
		},

		// 添加dom节点
		renderUI: function(){},
		// 添加监听事件
		bindUI: function(){},
		// 初始化组件属性
		syncUI: function(){},
		// 销毁
		destructor: function(){}
	}

// 	return {
// 		Widget : Widget
// 	}
// })()