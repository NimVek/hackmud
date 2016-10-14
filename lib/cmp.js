function (a, b, comperator) {
    var i, result;

    // add compare two elements
    if (!l.is_def(comperator)) {
        return a < b ? -1 : a > b ? 1 : 0;
    } else if (l.is_func(comperator)) {
        return comperator(a, b);
    } else if (l.is_int(comperator)) {
        return sign(comperator) * cmp(a[abs(comperator)], b[abs(comperator)]);
    } else if (l.is_str(comperator)) {
//        var [_, sign, key] = comperator.match(/([+-]?)(.*)/);
        var match = comperator.match(/([+-]?)(.*)/);
	key = match[2];
        var multiplicator = match[1] == "-" ? -1 : 1;
        return multiplicator * cmp(a[key], b[key]);
    } else if (l.is_arr(comperator)) {
        result = 0;
        for (i in comperator) {
            result = cmp(a, b, comperator[i]);
            if (0 !== result) break;
        }
        return result;
    } else if (l.is_obj(comperator)) {
        result = 0;
        for (i in comperator) {
            result = cmp(a[i], b[i], comperator[i]);
            if (0 !== result) break;
        }
        return result;
    }
    return 0;
}
