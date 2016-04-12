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

        init: function(param) {

            this.container = param.wrap;
            this.width = param.width || null;
            this.wrap = this.container.querySelector('.pop-wrap');
            this.header = this.container.querySelector('.pop-header') || null;
            this.type = param.type;

            //this.height = param.height || 300;

            this.container.className += ' ' + this.type;

            var self = this,
                confirm = this.container.querySelector('.confirm'),
                cancel  = this.container.querySelector('.cancel');


            if(!!confirm) {
                confirm.addEventListener('click', function() {
                    param.confirm();
                    self.hide();
                }, false);
            }

            if(!!cancel) {
                cancel.addEventListener('click', function() {
                    param.cancel();
                    self.hide();
                }, false);
            }

            this.width ? this.wrap.style.width = this.width : null;

            this.container.addEventListener('click', function(event) {
                event = window.event || event;
                if(event.target.className === self.container.className) {
                    self.hide();
                }
            }, true);

            return this;
        },

        show : function() {

            this.container.className += ' show';
            this.status = true;
        },

        hide: function() {

            this.container.className = this.container.className.replace(/show/g, '').trim();
            this.wrap.style.cssText = '';
            this.status = false;
        },

        toggle: function() {
            if(this.status) {
                this.hide();
            } else {
                this.show();
            }
        }
    };

    Popuper.prototype.init.prototype = Popuper.prototype;

    window.Popuper = Popuper;

})(window, document);

