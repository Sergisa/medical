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
Array.prototype.getUnique = function () {
    let a = [];
    for (let i = 0, l = this.length; i < l; i++)
        if (a.indexOf(this[i]) === -1 && this[i] !== '' && this[i] !== undefined && this[i] !== null)
            a.push(this[i]);
    return a;

}

