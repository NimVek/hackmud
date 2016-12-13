function(string, color) {
    var pre = "`" + color;
    var post = "`";

    if (color == '+') {
	pre = "`V"
    elif (color == '!') {
	pre = "`N"
    elif (color == '-') {
	pre = "`C"
    }

    return string.replace(/(\w+)/g, pre + "$1" + post);
}
