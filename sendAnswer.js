function sendAnswer() {
    if (arguments.length === 1 && _.isObject(arguments[0])) {
        if (Object.keys(arguments[0]).length == 2) {
            if (!_.isUndefined(arguments[0].text) && !_.isUndefined(showChip([arguments[0].hardChips]))) {
                $reactions.answer(arguments[0].text)
                showChip([arguments[0].hardChips])
            } else { 
                transferFromIntegration("sendAnswer(): text || hardChips - Undefined ");
            }
        } else {
            if (!_.isUndefined(arguments[0].text)) {
                $reactions.answer(arguments[0].text)
            } else { 
                transferFromIntegration("sendAnswer(): text - Undefined ");
            }
        }
        if (arguments.length === 2 && _.isObject(arguments[0]) && _.isArray(arguments[1])) {
            var file = file;
            if (_.isArray(responsePath)) {
                _.map(responsePath, function (path) {
                    var path = file[path.split('.')[0]][path.split('.')[1]]
                    _.map(Object.keys(path), function (textHardChips) {
                        if (textHardChips == 'text') {
                            if (path.text.length == 1) {
                                $reactions.answer(path.text[0])
                            }
                            else {
                                _.map(path.text, function (text) {
                                    $reactions.answer(text);
                                })
                            }
                        }
                        if (textHardChips == 'hardChips') {
                            showChip(path.hardChips);
                        }
                    })
                })
            }
        }
    }
}
