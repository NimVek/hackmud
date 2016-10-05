function() {

    // Convert hackmud timestr to date object
    function parse_timestr(date) {
        var iso = date.replace(/(\d{2})(\d{2})(\d{2})\.(\d{2})(\d{2})/, "20$1-$2-$3T$4:$5-04:00");
        return new Date(iso);
    }

    // security levels
    var security = [
        { string: "NULLSEC", color:'D' },
        { string: "LOWSEC",  color:'F' },
        { string: "MIDSEC",  color:'H' },
        { string: "HIGHSEC", color:'h' },
        { string: "FULLSEC", color:'L' }
    ];

    // access levels
    var access = {
        TRUST: { string: "TRUST", color:'+' },
        PRIVATE: { string: "PRIVATE", color:'-' },
        HIDDEN: { string: "HIDDEN", color:0 },
        PUBLIC: { string: "PUBLIC", color:1 }
    };

    // known classes
    var classes = [ "architect", "infiltrator", "scavenger", "executive" ];

    // rarities
    var rarity = [
        { string: "noob", color:0 },
        { string: "kiddie",  color:1 },
        { string: "h4x0r",  color:2 },
        { string: "h4rdc0r3", color:3 }
    ];

    // Export the symbols
    return {
        parse_timestr: parse_timestr,
        access: access,
        security: security,
        classes: classes,
        rarity: rarity
    };
}