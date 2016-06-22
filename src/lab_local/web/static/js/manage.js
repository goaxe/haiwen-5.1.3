/**
 * Created by fripSide on 14-9-21.
 */

$(function () {
    $(".dp-title a").click(function () {
        if (!confirm("确定要删除？")) return;
        var id = this.id;
        $.ajax({
            url: "del_department",
            method: "post",
            dataType: "json",
            data: {
                did: id
            }, success: function (result) {
                if (result.status == "ok") {
                    $("#" + id).hide();
                } else {
                    alert(result.message);
                }
            }
        });
    });

    $("a.del-user").click(function () {
        if (!confirm("确定要删除？")) return;
        var id = this.id;
        var url = gLocals.site_domain + "/account/delete_user";
        $.ajax({
            url: url,
            method: "post",
            dataType: "json",
            data: {
                uid: id
            }, success: function (result) {
                if (result.status == "ok") {
                     $("table tr#" + id).remove();
                } else {
                     alert(result.message);
                }
            }
        });
    });
});