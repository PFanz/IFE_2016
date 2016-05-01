var Drag = function Drag(element, handler){
	this.dragElement = element;
	this.handler = handler;
	this.on();
}

Drag.prototype = {

	on: function(){
		var that = this;
		that.dragElement.addEventListener('mousedown', function(event){
			if(that.handler && that.handler != event.target) {
					return ;
			}
			that.dragStart(event, that)
		});
	},

	dragStart: function(event, that){
				this.dragElement.style.top = this.dragElement.offsetTop + 'px';
				this.dragElement.style.left = this.dragElement.offsetLeft + 'px';
				this.dragElement.style.margin = '0';
				var mouseX = event.mouseX;
				var mouseY = event.mouseY;
				this.dragElement.addEventListener('mousemove', this.draging);
				this.dragElement.addEventListener('mouseup', function(){
					that.dragEnd();
				});
				this.dragElement.addEventListener('mouseout', function(){
					that.dragEnd();
				})

			},
		draging: function(event){
				event.preventDefault();
				var bodyWidth = document.documentElement.clientWidth;
				var bodyHeight = document.documentElement.clientHeight;
				var modalWidth = this.offsetWidth;
				var modalHeight = this.offsetHeight;
				if(this.offsetTop + event.movementY > 0 && (this.offsetTop + event.movementY < (bodyHeight - modalHeight))){
					this.style.top = this.offsetTop + event.movementY + 'px';
				}
				if(this.offsetLeft + event.movementX > 0 && (this.offsetLeft + event.movementX < (bodyWidth - modalWidth))) {
					this.style.left = this.offsetLeft + event.movementX + 'px';
				}
			},
		dragEnd: function(event){
			this.dragElement.removeEventListener('mousemove', this.draging);
		}
}