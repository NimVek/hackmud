function (array, order) {
    // sort with given order

    var lib = LIBRARY;
    if (l.is_func(order)) {
        return array.sort(order);
    }
    return array.sort(function(a, b) {
        return lib.cmp(a, b, order);
    });
}
