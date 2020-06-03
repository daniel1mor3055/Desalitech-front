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


export const capitalizeJson = (someObject) => {
    if (someObject && Array.isArray(someObject)) {
        someObject.forEach((elem) => capitalizeJson(elem));
    } else if (someObject && typeof someObject === 'object' && someObject !== null) {
        capitalizeObjectKeys(someObject);
        for (let property in someObject) {
            if (someObject.hasOwnProperty(property)) {
                capitalizeJson(someObject[property]);
            }
        }
    }
};


export const camelizeJson = (someObject) => {
    if (someObject && Array.isArray(someObject)) {
        someObject.forEach((elem) => camelizeJson(elem));
    } else if (someObject && typeof someObject === 'object' && someObject !== null) {
        camelizeObjectKeys(someObject);
        for (let property in someObject) {
            if (someObject.hasOwnProperty(property)) {
                camelizeJson(someObject[property]);
            }
        }
    }
};

export const extractSystemId = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const sysId = decodeURIComponent(queryParams.get('sysId'));
    return sysId;
};

export const dashboardIsCurrentLocation = () => {
    return window.location.pathname.includes('/app/dashboard');
};

export const pollAllSystems = () => {
    return window.location.pathname.includes('/app/system-select');
};
