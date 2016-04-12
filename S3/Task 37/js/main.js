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
        width: 0,
        height: 0,

        init: function(param) {

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

            //提示框拖动
            var offsetX = 0,
                offsetY = 0,
                mL = 0,
                mT = 0,
                windowHeight = document.documentElement.clientHeight,
                windowWidth  = document.documentElement.clientWidth;

            document.addEventListener('mousedown', _down, false);
            document.addEventListener('mouseup', _up, false);
            function _down (event) {

                event = event || window.event;

                if(
                    event.target.className === self.header.className ||
                    event.target.parentNode.className === self.header.className
                ) {
                    self.isDown = true;

                    //获取当前的transform值
                    var transform = /translate3d\((.*)px,.?(.*)px.?.*px\)/.exec(self.wrap.style.transform);

                    if(transform) {
                        mL = transform[1] || 0;
                        mT = transform[2] || 0;
                    } else {
                        mL = mT = 0;
                    }

                    offsetX = event.clientX - mL;
                    offsetY = event.clientY - mT;

                    document.addEventListener('mousemove', _move, false);
                }
            }
            function _move(event) {

                event = event || window.event;
                event.preventDefault();

                if(self.isDown) {
                    var positionX = event.clientX - offsetX,
                        positionY = event.clientY - offsetY,
                        elemLeft  = (windowWidth - self.width) / 2,
                        elemTop    = (windowHeight - self.height) / 2;

                    if(!(
                            - positionX >= elemLeft ||
                            positionX >= elemLeft ||
                            - positionY >=  elemTop ||
                            positionY >= elemTop
                        ))
                    {
                        self.wrap.style.transform = 'translate3d(' + positionX + 'px,' + positionY + 'px,0)';

                        //console.log('marginLeft:' + self.wrap.style.marginLeft + ';marginTop:' + self.wrap.style.marginTop);
                    }
                }
            }
            function _up(event) {

                if(self.isDown) {
                    self.isDown = false;
                    document.removeEventListener('mousemove', _move);
                }
            }

            this.container.addEventListener('click', function(event) {

                event = event || window.event;
                if(event.target.className === self.container.className && !self.isDown) {
                    self.hide();
                }

            }, true);


            return this;
        },

        show : function() {

            this.container.className += ' show';
            this.status = true;
            this.width = this.wrap.clientWidth;
            this.height = this.wrap.clientHeight;
            this.wrap.style.marginLeft = - (this.width / 2) + 'px';
            this.wrap.style.marginTop = - (this.height / 2) + 'px';

            //禁止页面滚动，不支持火狐
            window.addEventListener('mousewheel', _stopScroll, false);

            return this;
        },

        hide: function() {

            this.container.className = this.container.className.replace(/show/g, '').trim();
            this.wrap.style.cssText = '';
            this.status = false;

            window.removeEventListener('mousewheel', _stopScroll, false);

            return this;
        },

        toggle: function() {

            if(this.status) {
                this.hide();
            } else {
                this.show();
            }

            return this;
        },

        edit: function(conf) {

            conf.title ? this.header.querySelector('h3').innerText = conf.title : null;
            conf.content ? this.wrap.querySelector('.pop-content').innerHTML = conf.content : null;

            return this;
        }
    };

    function _stopScroll(event) {
        event = event || window.event;
        event.preventDefault();
    }

    Popuper.prototype.init.prototype = Popuper.prototype;

    window.Popuper = Popuper;

})(window, document);

