function() {

    // Convert hackmud timestr to date object
    function parse_timestr(date) {
        var iso = date.replace(/(\d{2})(\d{2})(\d{2})\.(\d{2})(\d{2})/, "20$1-$2-$3T$4:$5-04:00");
        return new Date(iso);
    }

    // Export the symbols
    return {
        parse_timestr: parse_timestr
    };
}