function() {
    var l = #s.scripts.lib();

    // add color to each word in text
    function color(text, col) {
        if (l.is_arr(text)) {
            return color(text[0], text[1]);
        }

        var replacement = "`" + col + "$1`";
        if (/[!+-]/.exec(col)) {
            replacement = col + "$1" + col;
        }
        return text.replace(/(\w+)/g, replacement);
    }

    // removes any color in text
    function decolor(text) {
        var result = text.replace(/([!+-])(\w+)\1/g, "$2");
        return result.replace(/`[A-Za-z0-9](\w+)`/g, "$1");
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
