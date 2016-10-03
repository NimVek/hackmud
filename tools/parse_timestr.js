function(context, args) {

    var l = #s.scripts.lib();

    function parse_timestr(date) {
        var iso = date.replace(/(\d{2})(\d{2})(\d{2})\.(\d{2})(\d{2})/, "20$1-$2-$3T$4:$5-04:00");
        return new Date(iso);
    }

    if (!args || !args.date || !args.date.match(/^\d{6}\.\d{4}$/)) {
        return {
            ok: false,
            msg: "usage: " + context.this_script + ' { date:"' + l.to_game_timestr(l.get_date()) + '" }'
        };
    }

    var date = parse_timestr(args.date);

    return {
        ok: !isNaN(date.getTime()),
        msg: date.toString()
    };
}
