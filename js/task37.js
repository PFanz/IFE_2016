(function(){
	var body = document.getElementsByTagName('body')[0];
	var modal = {
		modalTitle: '这里是标题',
		modalBody: '这里是内容',
		htmlTemp: '',
		resetModal: function() {
				this.htmlTemp = '<div class="modal">'+
					'<div class="modal-header">'+
						'<span class="h1">'+this.modalTitle+'</span>'+
						'<span class="close">&times</span>'+
					'</div>'+
					'<div class="modal-body">'+
					this.modalBody+
					'</div>'+
					'<div class="modal-footer">'+
						'<input class="button" type="button" id="modal-sure" value="确定">'+
						'<input class="button" type="button" id="modal-concle" value="取消">'+
					'</div>'+
				'</div>';
			},

		resetEvent: function(){
			
				// 显示
				document.getElementById('test').addEventListener('click',function(){
					modal.resetModal();
					modal.show();
				});
				// 消失
				document.getElementById('modal-sure').addEventListener('click',function(){
					modal.hide();
				});
				document.getElementsByClassName('close')[0].addEventListener('click', function(){
					modal.hide();
				});
				document.getElementById('modal-concle').addEventListener('click',function(){
					modal.hide();
				});
				document.getElementsByClassName('modal-show')[0].addEventListener('click', function(){
					modal.hide();
				});
				// 拖拽
				document.getElementsByClassName('modal-header')[0].addEventListener('mousedown', modal.dragStart);
		},

		show: function(){
				body.innerHTML += '<div class="modal-show"></div>';
				body.innerHTML += this.htmlTemp;
				// dom发生变化的时候，绑定事件会消失！！！
				modal.resetEvent();
			},
		hide: function(){
				document.getElementsByClassName('modal-show')[0].remove();
				document.getElementsByClassName('modal')[0].remove();
			},
		dragStart: function(event){
				// console.log('dragStart');
				// console.log(event);
				var modalElement = document.getElementsByClassName('modal')[0];
				modalElement.style.top = modalElement.offsetTop + 'px';
				modalElement.style.left = modalElement.offsetLeft + 'px';
				// modalElement.style.position = 'relative';
				modalElement.style.margin = '0';

				var mouseX = event.mouseX;
				var mouseY = event.mouseY;
				modalElement.addEventListener('mousemove', modal.draging);
				modalElement.addEventListener('mouseup', modal.dragEnd);

			},
		draging: function(event){
				// console.log('mousemove');
				// console.log(event.movementX);
				var modalElement = document.getElementsByClassName('modal')[0];
				console.log(modalElement.offsetTop);
				if(modalElement.offsetTop + event.movementY > 0){
					modalElement.style.top = modalElement.offsetTop + event.movementY + 'px';
				}
				if(modalElement.offsetLeft + event.movementX > 0) {
					modalElement.style.left = modalElement.offsetLeft + event.movementX + 'px';
				}
			},
		dragEnd: function(event){
			// console.log('dragEnd');
			// console.log(event);
			var modalElement = document.getElementsByClassName('modal')[0];
			modalElement.removeEventListener('mousemove', modal.draging);
		}
	};
	

	document.getElementById('test').addEventListener('click',function(){
		modal.resetModal();
		modal.show();
	})

})()


