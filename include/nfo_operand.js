function (operand) {
    var result = typeof(operand);
    switch(result) {
	case 'string':
	case 'number':
	    result += " (" + operand + ")";
	    break;
	case 'object':
	    result = {};
	    for (var key in operand) {
		result[key] = nfo_operand(operand[key]);
	    }
	    break;
    }
    return result;
}
