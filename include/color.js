function (string, color) {
    var pre = "`" + color;
    var post = "`";

    if ("+-!".indexOf(color) > -1) {
	pre = post = color;
    }

    return string.replace(/(\w+)/g, pre +"$1"+post);
}
