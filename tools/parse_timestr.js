function(context, args) { // date:""

    var l = #s.scripts.lib();

    INCLUDE(parse_timestr)

    if (!args || !args.date || !args.date.match(/^\d{6}\.\d{4}$/)) {
        return {
            ok: false,
            msg: "Usage: " + context.this_script + ' { date:"' + l.to_game_timestr(l.get_date()) + '" }'
        };
    }

    var date = parse_timestr(args.date);

    return {
        ok: !isNaN(date.getTime()),
        msg: date.toString()
    };
}
