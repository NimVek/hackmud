function(context, args) { // count:5
    var caller = context.caller;
    var l = #s.scripts.lib();
    var d = #s.dtr.lib();
    var list = #s.accts.transactions(args);

    var balance = -1;
    if (!args || !args.from && !args.to && !args.script) {
        balance = #s.accts.balance();
    }

    l.each(list, function(_, transaction) {
        transaction.time = l.to_game_timestr(transaction.time);
        transaction.description = transaction.memo || transaction.script;
        if (transaction.sender == caller) {
            transaction.withdrawal = transaction.amount;
            transaction.opposit = transaction.recipient;
        } else {
            transaction.deposit = transaction.amount;
            transaction.opposit = transaction.sender;
        }
        if (balance >= 0) {
            transaction.balance = balance;
            balance += (transaction.withdrawal || 0) - (transaction.deposit || 0);
        }
    });

    var titles = [
        { name: "+date+", key: "time" },
        { name: "+description+", key: "description" },
        { name: "+opposit+", key: "opposit" },
        { name: "+withdrawals+", key: "withdrawal", dir: -1, func: d.expandGC },
        { name: "+deposits+", key: "deposit", dir: -1, func: d.expandGC }
    ];

    if (balance >= 0) {
        titles.push(
            { name: "+balance+", key: "balance", dir: -1, func: d.expandGC });
    }

    var usage = '\n\nFor more transactions, add count:<"all" or number>\nFilter for sender, recipient or script, add from:"<user>", to:"<user>" or script:"<script>".\n';

    return {
        ok: true,
        msg: d.columns(list.reverse(), titles, {pre:"", suf:""}, true) + usage
    };
}
