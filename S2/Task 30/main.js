/**
 * Created by Gong on 2016/3/24.
 */

(function(d, w, undefined) {

    'use strict';

    var checkValid = d.getElementById('check'),
        inputArea  = d.getElementById('input-area'),
        content    = d.getElementById('input'),
        info       = d.getElementById('info'),
        classNames = { error : 'error', successful : 'successful'};



    checkValid.addEventListener('click', function() {

        var val       = content.value.trim(),
            valLength = val.replace(/[\u0391-\uFFE5]/g, 'GG').length;

        if(valLength === 0) {
            setStatus(classNames.error, '输入内容不得为空');
            return;
        }

        if(valLength < 4 || valLength > 16) {
            setStatus(classNames.error, '字符数为4~16位');
            return;
        }

        setStatus(classNames.successful, '名称格式正确');
    });

    function setStatus(status, infoText) {

        inputArea.className = 'input-area ' + status;
        info.innerHTML       = infoText;
    }

})(document, window);
