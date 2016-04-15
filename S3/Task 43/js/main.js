(function(window, document) {

    function yoPhoto(param) {
        return new yoPhoto.prototype.init(param);
    }

    yoPhoto.prototype = {

        constructor: yoPhoto,
        wrap: null,
        imgList: null,
        prefix: 'layout',
        width: 0,
        height: 0,

        init: function(param) {

            this.wrap = param.wrap;
            this.imgList = this.wrap.querySelectorAll('img');

            this.wrap.className += ' yoPhoto';
            this.wrap.style.width = this.width = param.width || '960px';
            this.wrap.style.height = this.height = param.height || '400px';

            this.layout(this.imgList.length);
        },

        layout: function(count) {

            count = parseInt(count, 10);



            switch (count) {

                case 1:
                {
                    this.wrap.className +=  ' ' + this.prefix + '-1';

                    for(var i = 0; i<this.imgList.length; i++) {

                        var div = document.createElement('div');

                        div.className = 'imgCover';
                        div.style.backgroundImage = 'url(' + this.imgList[i].src　+　')';
                        div.dataset.alt = this.imgList[i].alt || '';
                        this.wrap.appendChild(div);
                    }

                } break;

                case 2:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-2';

                    for(var i = 0; i<this.imgList.length; i++) {

                        var div = document.createElement('div');

                        div.className = 'imgCover';
                        div.style.backgroundImage = 'url(' + this.imgList[i].src　+　')';
                        div.dataset.alt = this.imgList[i].alt || '';
                        this.wrap.appendChild(div);
                    }

                } break;

                case 3:
                {

                    this.wrap.className +=  ' ' + this.prefix + '-3';

                    for(var i = 0; i<this.imgList.length; i++) {

                        var div = document.createElement('div');

                        div.className = 'imgCover';
                        div.style.backgroundImage = 'url(' + this.imgList[i].src　+　')';
                        div.dataset.alt = this.imgList[i].alt || '';

                        var width = parseInt(this.width, 10),
                            height = parseInt(this.height, 10);
                        switch (i) {
                            case 0:
                                div.style.width = width - (height / 2) + 'px';
                                //div.style.float = 'left';
                                break;
                            case 1:
                                div.style.width = div.style.height = height / 2 + 'px';
                                //div.style.float = 'right';
                                break;
                            case 2:
                                div.style.width = div.style.height = height / 2 + 'px';
                                //div.style.float = 'right';
                                break;
                        }

                        this.wrap.appendChild(div);
                    }

                } break;

                case 4:;break;
                case 5:;break;
                case 6:;break;
                default: console.warn('Doesn\'t support.'); break;
            }

        }
    };

    yoPhoto.prototype.init.prototype = yoPhoto.prototype;
    window.yoPhoto = yoPhoto;

})(window, document);