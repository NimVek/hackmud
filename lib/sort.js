function (array, order) {
    // sort with given order
    if (l.is_func(order)) {
        return array.sort(order);
    }
    return array.sort(function(a, b) {
        return this.cmp(a, b, order);
    });
}
