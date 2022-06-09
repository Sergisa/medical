Array.prototype.max = function () {
    return Math.max.apply(null, this);
}
Array.prototype.min = function () {
    return Math.min.apply(null, this);
}
Array.prototype.maxIndex = function () {
    return this.indexOf(Math.max.apply(null, this))
}
Array.prototype.minIndex = function () {
    return this.indexOf(Math.min.apply(null, this))
}
$.moveBottom = function (speed) {
    $("html, body").animate({
        scrollTop: $(document).height()
    }, speed ?? 1000);
}
