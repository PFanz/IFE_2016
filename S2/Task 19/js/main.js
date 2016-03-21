/**
 * Created by Gong on 2016/3/21.
 */
(function(w,d) {

    var $ = function(id) {
        return d.getElementById(id);
    }

    var num       = $('num'),
        queue     = [],
        queueList = $('queue'),
        input     = d.getElementsByTagName('input'),
        i         = 0;

    for(;i < input.length; i++) {
        input[i].addEventListener('click', function() {

            //判断是否为按钮
            if(this.type !== 'button') return;

            var val     = num.value;
            var inputID = this.id;

            if(inputID.indexOf('random') < 0 && inputID.indexOf('quick-sort') < 0) {

                //超过六十个元素禁止添加
                if(queue.length === 60) {
                    alert('元素超过六十个禁止添加');
                    return;
                }
                //判断是否为纯数字
                if(!/^\d+$/.test(val) || val < 10 || val > 100) {
                    alert('请输入纯数字,数字范围为10-100');
                    return;
                }
            }

            //通过判断元素ID名执行不同的操作
            switch (inputID) {
                case 'left-in' :
                    queue.unshift(val);
                    flushQueue(queueList, queue);
                    break;
                case 'right-in' :
                    queue.push(val);
                    flushQueue(queueList, queue);
                    break;
                case 'left-out' :
                    alert(queue.shift());
                    flushQueue(queueList, queue);
                    break;
                case 'right-out' :
                    alert(queue.pop());
                    flushQueue(queueList, queue);
                    break;
                case 'random' :
                    randomQueue();
                    flushQueue(queueList, queue);
                    break;
                case 'quick-sort' :
                    quickSort(queue);
                    break;
            }
        })
    }

    //刷新队列
    function flushQueue(elem, queue) {

        var i    = 0;
        var html = '';
        for(; i < queue.length; i++) {
            html += '<li style="height:' + queue[i] * 5 + 'px">' + '</li>';
        }

        elem.innerHTML = html;
    }

    //快排
    function quickSort(queue) {

        console.log('Original:' + queue);
        var queueStatus = [];
        function _sort(left, right) {

            if( left >= right) return;

            var i = left,
                j = right;

            var key = queue[i];

            while (i < j) {

                for(; j > i; j--) {
                    if(queue[j] < key) {
                        _arrSwap(queue, i, j);
                        break;
                    }
                }
                for(; i < j; i++) {
                    if(queue[i] > key) {
                        _arrSwap(queue, i, j);
                        break;
                    }
                }
            }

            _sort(left, i - 1);
            _sort(i + 1, right);
        }
        //元素交换
        function _arrSwap(arr, index1, index2) {
            var tmp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = tmp;

            queueStatus.push(arr.slice(0));
        }
        //刷新队列
        function _flushQueue(elem, queueStatus) {
            var i = 0;
            //console.log(queueStatus);
            var process = setInterval(run, 200);

            function run() {
                // alert("aa")

                if(i === queueStatus.length) {
                    clearInterval(process);
                    return;
                }

                var html = '',
                    j    = 0,
                    q = queueStatus[i++];
                for(; j < q.length; j++) {
                    html += '<li style="height:' + q[j] * 5 + 'px">' + '</li>';
                }
                elem.innerHTML = html;

            };
        }

        _sort(0, queue.length - 1);
        _flushQueue(queueList, queueStatus);
    }

    //随机生成队列
    function randomQueue() {
        for(var i = 0; i < 50; i++) {
            queue.push(parseInt(Math.random() * 100));
        }
    }


})(window,document);