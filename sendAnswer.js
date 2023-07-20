/** Пушим ответы из yaml
* @param {pathToObject}  pathToObject - Объект или массив объектов с ответоами и чипсами
* Если аргумент валиден, то функция пушит ответы и возвращает true
* Если один из объектов невалиден, то ответы не пушаться, функция возвращается folse 
*/


function sendAnswer(pathToObject) {
    // Валидация объета на наличие text и hardChips
    function validationObjectResponse(response) { 
        return !(
            (Object.keys(response).length === 2 && (_.isUndefined(response.text) || _.isUndefined(response.hardChips))) ||
            (Object.keys(response).length === 1 && _.isUndefined(response.text))
        );
    }
     // Пушим text и hardChips
    function pushResponse(element) {
        if (!_.isUndefined(element.text)) {
            console.log('отправляем текст ' + element.text);
        }
        if (!_.isUndefined(element.hardChips)) {
            console.log('отправляем чипс ' + element.hardChips);
        }
    }
    // Пушим text и hardChips если sendAnswer был вызван с одним объектом, если что-то пошло не так, возвращаем false
    if (!Array.isArray(pathToObject)) {
        if (validationObjectResponse(pathToObject)) {
            pushResponse(pathToObject);
        } else {
            return false;
        }
    } else {
        // Пушим text и hardChips если sendAnswer был вызван с массивом объектом, если что-то пошло не так, возвращаем false
        if (_.every(pathToObject, (obj) => obj && (!_.isUndefined(obj.text) || !_.isUndefined(obj.hardChips)))) {
            _.each(pathToObject, pushResponse);
        } else {
            return false;
        }
    }
    return true;
}
