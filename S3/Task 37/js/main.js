/**
 * Created by Gong on 2016/4/11.
 */
(function(window, document) {

    'use strict';

    function Popuper(param) {
        return new Popuper.prototype.init(param);
    }

    Popuper.prototype = {

        constructor : Popuper,

        container: null,
        wrap: null,
        header: null,
        status: false,
        isDown: false,

        init: function(param) {

            this.width = param.width || null;

            this.container = param.wrap || null;
            this.wrap = this.container.querySelector('.pop-wrap') || null;
            this.header = this.container.querySelector('.pop-header') || null;
            if (!this.container || !this.wrap || !this.header) {
                console.warn('HTML格式不符');
                return;
            }

            this.type = param.type || info;

            //设置提示框类型
            this.container.className += ' ' + this.type;

            var self = this,
                confirm = this.container.querySelector('.confirm'),
                cancel  = this.container.querySelector('.cancel');

            //绑定确定按钮事件
            if(!!confirm) {
                confirm.addEventListener('click', function() {
                    param.confirm();
                    self.hide();
                }, false);
            }

            //绑定取消按钮事件
            if(!!cancel) {
                cancel.addEventListener('click', function() {
                    param.cancel();
                    self.hide();
                }, false);
            }

            //设置宽度
            this.width ? this.wrap.style.width = this.width : null;


            //提示框拖动
            var offsetX = 0,
                offsetY = 0,
                mL = 0,
                mT = 0;
            this.header.addEventListener('mousedown', _down, false);
            this.wrap.addEventListener('mouseup', _up, false);
            function _down (event) {

                event = event || window.event;

                self.isDown = true;

                //获取当前的margin值
                mL = parseInt(self.wrap.style.marginLeft || 0, 10);
                mT = parseInt(self.wrap.style.marginTop || 0, 10);

                offsetX = event.clientX - mL;
                offsetY = event.clientY - mT;

                self.header.addEventListener('mousemove', _move, false);
            }
            function _move(event) {

                event = event || window.event;

                var positionX = event.clientX - offsetX,
                    positionY = event.clientY - offsetY;

                //if(!())

                self.wrap.style.marginLeft = positionX + 'px';
                self.wrap.style.marginTop = positionY + 'px';

                console.log('marginLeft:' + self.wrap.style.marginLeft + ';marginTop:' + self.wrap.style.marginTop);
            }
            function _up(event) {

                self.isDown = false;
                self.header.removeEventListener('mousemove', _move);
            }

            this.container.addEventListener('click', function(event) {

                event = event || window.event;
                if(event.target.className === self.container.className && !self.isDown) {
                    self.hide();
                    self.header.removeEventListener('mousemove', _move);
                }

            }, true);


            return this;
        },

        show : function() {

            this.container.className += ' show';
            this.status = true;

            //禁止页面滚动，不支持火狐
            window.addEventListener('mousewheel', _stopScroll, false);
        },

        hide: function() {

            this.container.className = this.container.className.replace(/show/g, '').trim();
            this.wrap.style.cssText = '';
            this.status = false;

            window.removeEventListener('mousewheel', _stopScroll, false);
        },

        toggle: function() {

            if(this.status) {
                this.hide();
            } else {
                this.show();
            }
        }
    };

    function _stopScroll(event) {
        event = event || window.event;
        event.preventDefault();
    }

    Popuper.prototype.init.prototype = Popuper.prototype;

    window.Popuper = Popuper;

})(window, document);

