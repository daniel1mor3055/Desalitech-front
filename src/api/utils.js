export const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
};

export const camelizeObjectKeys = (object) => {
    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            const camelizedProperty = camelize(property);
            if (property !== camelizedProperty) {
                Object.defineProperty(object, camelizedProperty,
                    Object.getOwnPropertyDescriptor(object, property));
                delete object[property];
            }
        }
    }
};


export const camelizeArrayOfObjects = (arrayOfObjects) => {
    arrayOfObjects.forEach((object) => {
        camelizeObjectKeys(object);
    });
};


export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeObjectKeys = (object) => {
    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            const capitalizedProperty = capitalizeFirstLetter(property);
            if (property !== capitalizedProperty) {
                Object.defineProperty(object, capitalizedProperty,
                    Object.getOwnPropertyDescriptor(object, property));
                delete object[property];
            }
        }
    }
};

export const capitalizeArrayOfObjectKeys = (arrayOfObjects) => {
    arrayOfObjects.forEach((object) => {
        capitalizeObjectKeys(object);
    });
};
