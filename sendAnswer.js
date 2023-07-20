import * as _ from 'underscore';
import yaml from 'js-yaml';
import fs from 'fs';
import { appendFile } from 'fs/promises';

function sendAnswer(pathToObject) {
    function validationObjectResponse(response) {
        return !(
            (Object.keys(response).length === 2 && (_.isUndefined(response.text) || _.isUndefined(response.hardChips))) ||
            (Object.keys(response).length === 1 && _.isUndefined(response.text))
        );
    }

    function pushResponse(element) {
        if (!_.isUndefined(element.text)) {
            console.log('отправляем текст ' + element.text);
        }
        if (!_.isUndefined(element.hardChips)) {
            console.log('отправляем чипс ' + element.hardChips);
        }
    }

    if (!Array.isArray(pathToObject)) {
        if (validationObjectResponse(pathToObject)) {
            pushResponse(pathToObject);
        } else {
            return false;
        }
    } else {
        if (_.every(pathToObject, (obj) => obj && (!_.isUndefined(obj.text) || !_.isUndefined(obj.hardChips)))) {
            _.each(pathToObject, pushResponse);
        } else {
            return false;
        }
    }
    return true;
}
