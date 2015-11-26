/**
 * Created by qqy on 15/11/26.
 */
$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var hash = $(e.target).attr('href');
        if (hash == "#images") {
            hash = "";
        } else {
            hash = hash.replace('#tab-', '#');
        }
        $('#vanilla-comments').detach().prependTo($(e.target).attr('href') + ' .one-comentarios')
        location.hash = hash;
        window.scrollTo(0, 0);
    })

    if (location.hash != "") {
        $('#one-navbar a[href=' + location.hash.replace('#', '#tab-') + ']').tab('show');
        window.scrollTo(0, 0);
    }
});