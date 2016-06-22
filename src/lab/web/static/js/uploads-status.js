/**
 * Created by Administrator on 14-10-4.
 */

$(function() {
    setInterval(function() {
        window.location.reload();
        console.log('reload')
    }, 10000)
}());

function refresh() {
    
}

function loadUploadSet(uploadSet) {
    for (var i = 0; i < uploadSet.length; ++i) {
        var up = uploadSet[i];
        loadProgressBar(up);
    }
}

function getProgress(info) {
    var pre = parseInt(info['cur'] / info['total'] * 100);
//    console.log(pre);
    return '<div class="status-item">' +
        '<span>文件名：' + info['file_name'] + '&nbsp;&nbsp;</span>' +
        '<span>上传时间:' + info['update_time'] + '&nbsp;&nbsp;</span>' +
        '<span>文件大小: ' + info['total'] + 'M&nbsp;&nbsp;</span>' +
        '<span>速度：' + info['speed'] + 'k/s&nbsp;&nbsp;</span>' +
        '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" ' +
        'id=' + info['tid'] +
        ' role="progressbar" aria-valuemin="0" aria-valuemax="100" ' +
        'style="width: ' + pre +'%">' + pre + '%</div></div></div>';
}

function loadProgressBar(info) {
    var fid = info['file_id'];
    var tid = info.tid;
    var ht = getProgress(info);
//    console.log(ht);
    $(".upload-group").append(ht);
    var val = 0;
    window.setInterval(function() {
        var url = gLocals.site_domain + '/status/current_speed';
        $.ajax({
            url: url,
            method: 'post',
            data: {
                'file_id': fid
            },
            success:function(result) {
                console.log(result);
                console.log(result.cur, result.total);
                val = parseInt(result.cur * 100 / result.total);
                $("#" + tid).css({width: val + '%'});
                $("#" + tid).text(val + '%');
                if (val > 100)
                    $(".upload-group").hide(ht);
            }
        });
    }, 1000);
}