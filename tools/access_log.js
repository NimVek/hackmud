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
        var entry = { line: line };
        var match = line.match(/^(\d{6}\.\d{4})\s+(.*)$/);
        if (match) {
            entry.date = parse_timestr(match[1]);
            entry.line = line = match[2];
        }
        match = line.match(/ from (\w+\.\w+)$/);
        if (match) {
            entry.from = nfo_script(match[1]);
        }
        match = line.match(/^(Connection|Breach attempt|System access) from /);
        if (match) {
            if (match[1].match(/attempt/i)) {
                entry.type = "attempt";
                entry.level = 2;
            } else if (match[1].match(/access/i)) {
                entry.type = "access";
                entry.level = 3;
            } else {
                entry.type = "connect";
                entry.level = entry.from.valid ? 1 : 0;
            }
        }
        match = line.match(/^(\w+\.\w+) execution from /);
        if (match) {
            entry.type = "exec";
            entry.script = nfo_script(match[1]);
            entry.level = 4;
            if (match[1] === "sys.write_log") {
                entry.args = result.pop().line;
            }
        }
        result.push(entry);
    });

    if (context.is_scriptor || context.calling_script) {
        return result;
    }

    result = result.filter(function(entry) {
        return entry.level > 0;
    });

    var titles = [
        { name: "+date+", key: "date", func: fmt_date },
        { name: "+from+", key: "from", func: fmt_script },
        { name: "+type+", key: "type" },
        { name: "+script+", key: "script", func: fmt_script },
        { name: "+args+", key: "args" }
    ];

    return {
        ok: true,
        msg: dtr.columns(result, titles, { pre: "", suf: "" }, true)
    };
}
