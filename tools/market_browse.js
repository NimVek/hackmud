function(context, args) {
    var l = #s.scripts.lib(), 
        d = #s.dtr.lib();

    args = args || {};
    if (!(args.name || args.type || args.tier || args.class || args.cost)) {
        var balance = #s.accts.balance();
        args.cost = { "$lte": balance };
    }

    var order = args.order || [ "tier", "type", "name", "rarity" ],
        list = #s.market.browse(args),
        market = {};

    if (list.length === 0) {
        return {
            ok: false,
            msg: "No suitable upgrades found.\nUsage: " + context.this_script + ' { name:"<upgrade name", type:"<lock, script_space, script>", tier:<1-4>, class:"<architect, executive, infitrator, scavenger>", cost:<num or GC str>, order:<array of properties> }'
        };
    }

    l.each(list, function(_, item) {
        var id = "" + item.rarity + "-" + item.name;
        if (!(null === item.i || id in market)) {
	    market[id] = item;
	}
    });

    list = [];
    for (var id in market) {
        var item = #s.market.browse({ i: market[id].i });
        for (var key in item.upgrade)
            item[key] = item.upgrade[key];
        item.class = item.up_class;
        list.push(item);
    }

    list.sort(function(a, b) {
        var result = 0;
        for (var key in order) {
	    key = order[key];
	    result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
            if (0 !== result) break;
        }
        return result;
    });

    var classes = [ "architect", "infiltrator", "scavenger", "executive" ];

    var titles = [
        { name: "Name", key: "name" },
        { name: "Rarity", key: "rarity", func: d.coloredRarityLevel },
        { name: "Cost", key: "cost", dir: -1, func: d.expandGC },
        { name: "Token", key: "i" },
        { name: "Type", key: "type" },
        { name: "Class", key: "class", func: function(value) {
                                                 return classes[value] || "none";
                                             }},
        { name: "Tier", key: "tier", dir: 0 } ];

    titles.sort(function(a, b) {
        return order.indexOf(a.key) != -1 ? order.indexOf(b.key) != -1 ? order.indexOf(a.key) - order.indexOf(b.key) : -1 : order.indexOf(b.key) != -1 ? 1 : 0;
    });

    return {
        ok: true,
        msg: d.columns(list, titles, {})
    };
}
