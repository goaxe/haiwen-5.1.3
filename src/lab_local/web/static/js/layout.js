/**
 * Created by Administrator on 14-9-25.
 */
$(function () {
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", gLocals.csrf);
            }
        }
    });
    $(function () {
        setTimeout(showFlash, 200);
        setTimeout(hideFlash, 2000);
    });

    function showFlash() {
        $('.flash-message').slideDown('fast');
    }
    function hideFlash() {
        $('.flash-message').slideUp('fast')
    }
});