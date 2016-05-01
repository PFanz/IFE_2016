var Window = function Window(){
	this.cfg = {
		width: 500,
		height: 300,
		title: '标题',
		content: '这里是内容区域',
		hasCloseBtn: true,
		hasMask: true,
		isDraggable: true,
		dragHandle: '.modal-header',
		skinClassName: 'success',
		text4AlertBtn: '确定',
		handler4AlerBtn: null,
		handler4CloseBtn: null
	};
}

Window.prototype = deepCopy(new Widget(), {

	renderUI: function(test){
		this.bodyElement = document.getElementsByTagName('body')[0];
		this.boundingBox = document.createElement('div');
		this.boundingBox.className = 'modal';

		this.modalHeader = document.createElement('div');
		this.modalHeader.className = 'modal-header';
		this.modalHeaderText = document.createTextNode(this.cfg.title);
		this.modalHeader.appendChild(this.modalHeaderText);

		this.modalBody = document.createElement('div');
		this.modalBody.className = 'modal-body';

		this.modalBodyText = document.createTextNode(this.cfg.content);
		this.modalBody.appendChild(this.modalBodyText);

		this.modalFooter = document.createElement('div');
		this.modalFooter.className = 'modal-footer';

		this.sureBtn = document.createElement('input');
		this.sureBtn.setAttribute('type','button');
		this.sureBtn.setAttribute('value',this.cfg.text4AlertBtn);
		this.sureBtn.setAttribute('id','modal-sure');
		this.sureBtn.className = 'button';

		this.modalFooter.appendChild(this.sureBtn);
		this.boundingBox.appendChild(this.modalHeader);
		this.boundingBox.appendChild(this.modalBody);
		this.boundingBox.appendChild(this.modalFooter);
		// 遮盖层
		if(this.cfg.hasMask){
			this.maskElement = document.createElement('div');
			this.maskElement.className = 'window_mask';
			document.body.appendChild(this.maskElement);
		}
		// 关闭按钮
		if(this.cfg.hasCloseBtn){
			this.closeBtn = document.createElement('span');
			this.closeBtn.className = 'window_closeBtn';
			this.closeBtnText = document.createTextNode('x');
			this.closeBtn.appendChild(this.closeBtnText);
			this.boundingBox.appendChild(this.closeBtn);
		}
	},

	bindUI: function(){

		var that = this;
		// 回调函数
		if(this.cfg.handler4AlertBtn){
			this.on('alert', this.cfg.handler4AlertBtn);
		}

		if(this.cfg.handler4CloseBtn){
			this.on('close', this.cfg.handler4CloseBtn);
		}

		document.getElementById('modal-sure').addEventListener('click', function(){
			that.fire('alert');
			that.destroy();
		});

		document.getElementById('modal-concle') && document.getElementById('modal-concle').addEventListener('click', function(){
			that.fire('close');
			that.destroy();
		});

		document.querySelector('.window_closeBtn').addEventListener('click', function(){
			that.fire('close');
			that.destroy();
		})

	},

	syncUI: function(){

		this.boundingBox.style.width = this.cfg.width + 'px';
		this.boundingBox.style.height = this.cfg.height + 'px';
		this.boundingBox.style.left = (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px';
		this.boundingBox.style.top = (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px';

		if(this.cfg.skinClassName){
			this.boundingBox.className += ' ' + this.cfg.skinClassName;
		}
		if(this.cfg.isDraggable){
			if(this.cfg.dragHandle){
				new Drag(this.boundingBox, document.querySelector(this.cfg.dragHandle));
			} else {
				new Drag(this.boundingBox);
			}
		}
	},

	destructor: function(){
		this.maskElement && this.maskElement.remove();
	},

	alert: function(cfg){
		deepCopy(this.cfg, cfg);
		this.render();
		return this;
	}

});
