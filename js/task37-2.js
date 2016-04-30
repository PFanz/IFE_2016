var Window = function Window(){
	this.cfg = {
		width: 500,
		height: 300,
		title: '标题',
		content: '这里是内容区域',
		hasCloseBtn: true,
		hasMask: true,
		isDraggable: true,
		dragHandle: '.window_header',
		skinClassName: null,
		text4AlertBtn: '确定',
		handler4AlerBtn: null,
		handler4CloseBtn: null
	};
}

Window.prototype = deepCopy(new Widget(), {

	renderUI: function(test){
		var bodyElement = document.getElementsByTagName('body')[0];
		this.boundingBox = document.createElement('div');
		this.boundingBox.className = 'modal';

		var modalHeader = document.createElement('div');
		modalHeader.className = 'modal-header';
		var modalHeaderText = document.createTextNode(this.cfg.title);
		modalHeader.appendChild(modalHeaderText);

		var modalBody = document.createElement('div');
		modalBody.className = 'modal-body';

		var modalBodyText = document.createTextNode(this.cfg.content);
		modalBody.appendChild(modalBodyText);

		var modalFooter = document.createElement('div');
		modalFooter.className = 'modal-footer';

		var sureBtn = document.createElement('input');
		sureBtn.setAttribute('type','button');
		sureBtn.setAttribute('value',this.cfg.text4AlertBtn);
		sureBtn.setAttribute('id','modal-sure');
		sureBtn.className = 'button';

		modalFooter.appendChild(sureBtn);
		this.boundingBox.appendChild(modalHeader);
		this.boundingBox.appendChild(modalBody);
		this.boundingBox.appendChild(modalFooter);

		if(this.cfg.hasMask){
			var maskElement = document.createElement('div');
			maskElement.className = 'window_mask';
			document.body.appendChild(maskElement);
		}
		if(this.cfg.hasCloseBtn){
			var closeBtn = document.createElement('span');
			closeBtn.className = 'window_closeBtn';
			var closeBtnText = document.createTextNode('X');
			closeBtn.appendChild(closeBtnText);
			this.boundingBox.appendChild(closeBtn);
		}
	},

	bindUI: function(){

		var that = this;
		
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

	},

	sycnUI: function(){

		this.boundingBox.css({
			width : this.cfg.width + 'px',
			height : this.cfg.height + 'px',
			left : (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',
			top : (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + 'px'
		});
		if(this.cfg.skinClassName){
			this.boundingBox.addClass(this.cfg.skinClassName);
		}
		if(this.cfg.isDraggable){
			if(this.cfg.dragHandle){
				this.boundingBox.draggable({handle:this.cfg.dragHandle});
			} else {
				this.boundingBox.draggable();
			}
		}
	},

	destructor: function(){
		this._mask && document.getElementsByClassName('window_mask')[0].remove();
	},

	alert: function(cfg){
		deepCopy(this.cfg, cfg);
		this.render();
		return this;
	}

});
