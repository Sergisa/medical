$.moveBottom = function (speed) {
    $("html, body").animate({
        scrollTop: $(document).height()
    }, speed ?? 1000);
}
