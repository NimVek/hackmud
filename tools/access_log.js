function(context, args) {
    var log = #s.sys.access_log();

    INCLUDE(stdlib);
    INCLUDE(dtr);
    INCLUDE(parse_timestr);
    INCLUDE(nfo_user);
    INCLUDE(nfo_script);
    INCLUDE(fmt_user);
    INCLUDE(fmt_date);
    INCLUDE(fmt_script);

    var result = [];

    stdlib.each(log, function(_, line) {
	var entry = { line:line };
	var match = line.match(/^(\d{6}\.\d{4})\s+(.*)$/);
	if (match) {
	    entry.date = parse_timestr(match[1]);
	    entry.line = line = match[2];
	}
	match = line.match(/^Connection from ((\w+)\.\w+)$/);
	if (match) {
	    entry.type = "connection";
	    entry.user = nfo_user(match[2]);
	    entry.script = nfo_script(match[1]);
	    delete entry.line;
	}
	result.push(entry);
    });

    if (context.is_scriptor || context.calling_script) {
	return result;
    }

    var titles = [
        { name: "+date+", key: "date", func: fmt_date },
        { name: "+type+", key: "type" },
        { name: "+user+", key: "user", func: fmt_user },
        { name: "+script+", key: "script", func: fmt_script }
    ];

    return {
        ok: true,
        msg: dtr.columns(result, titles, {pre:"", suf:""}, true)
    };
}
