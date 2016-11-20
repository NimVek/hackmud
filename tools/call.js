function(context, args) { // scriptor:#s.<scriptor>
    INCLUDE(nfo_script);

    if (!args || !args.scriptor) {
	return {
	    ok: false,
	    msg:context.this_script + " { scriptor:<scriptor> [, args:<arguments>] }"
	};
    }
    var scriptor = args.scriptor;

    return {
        info: nfo_script(scriptor.name),
        result: scriptor.call(args.args)
    };
}
