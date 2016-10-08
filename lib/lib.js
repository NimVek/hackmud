function() {

    // add compare two elements
    function cmp(a, b, comperator) {
        if (!l.is_def(comperator)) {
            return a < b ? -1 : a > b ? 1 : 0;
        } else if (l.is_func(comperator)) {
            return comperator(a, b);
        } else if (l.is_int(comperator)) {
            return sign(comperator) * cmp(a[abs(comperator)], b[abs(comperator)]);
        } else if (l.is_str(comperator)) {
            var [_, sign, key] = comperator.match(/([+-]?)(.*)/);
            sign = sign == "-" ? -1 : 1;
            return sign * cmp(a[key], b[key]);
        } else if (l.is_arr(comperator)) {
            var result = 0;
            for (var i in comperator) {
                result = cmp(a, b, comperator[i]);
                if (0 != result) break;
            }
            return result;
        } else if (l.is_obj(comperator)) {
            var result = 0;
            for (var i in comperator) {
                result = cmp(a[i], b[i], comperator[i]);
                if (0 != result) break;
            }
            return result;
        }
        return 0;
    }

    // sort with given order
    function sort(array, order) {
        if (l.is_func(order)) {
            return array.sort(order);
        }
        return array.sort(function(a, b) {
            return cmp(a, b, order);
        });
    }

    // Convert hackmud timestr to date object
    function parse_timestr(date) {
        var iso = date.replace(/(\d{2})(\d{2})(\d{2})\.(\d{2})(\d{2})/, "20$1-$2-$3T$4:$5-04:00");
        return new Date(iso);
    }

    // security levels
    var security = [
        [ "NULLSEC", 'D' ],
        [ "LOWSEC",  'F' ],
        [ "MIDSEC",  'H' ],
        [ "HIGHSEC", 'h' ],
        [ "FULLSEC", 'L' ]
    ];

    // access levels
    var access = {
        TRUST:   [ "TRUST",   '+' ],
        PRIVATE: [ "PRIVATE", '-' ],
        HIDDEN:  [ "HIDDEN",  0 ],
        PUBLIC:  [ "PUBLIC",  1 ]
    };

    // known classes
    var classes = [ "architect", "infiltrator", "scavenger", "executive" ];

    // rarities
    var rarity = [
        [ "noob",     0 ],
        [ "kiddie",   1 ],
        [ "h4x0r",    2 ],
        [ "h4rdc0r3", 3 ]
    ];

    // Export the symbols
    return {
        color: color,
        decolor: decolor,
        parse_timestr: parse_timestr,
        access: access,
        security: security,
        classes: classes,
        rarity: rarity
    };
}
