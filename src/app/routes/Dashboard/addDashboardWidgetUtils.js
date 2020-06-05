import * as Yup from "yup";

export const getInitialValue = (widgetType) => {
    switch (widgetType) {
        case 'AddWidget': {
            return {widget: ''}
        }
        case 'Tag': {
            return {
                tagId: ''
            };
        }
        case 'Trigger': {
            return {
                tagId: '',
                controllerTagId: '',
            };
        }
        case 'Time Series': {
            return {
                tag1Id: '',
                tag2Id: '',
                tag3Id: '',
            };
        }
        case 'Middle Gauge': {
            return {
                measuredTag: '',
                lL: '',
                l: '',
                h: '',
                hH: '',
            };
        }
        case 'Right Gauge': {
            return {
                measuredTag: '',
                lL: '',
                l: '',
                h: '',
                hH: '',
            };
        }
        case 'Left Gauge': {
            return {
                measuredTag: '',
                lL: '',
                l: '',
                h: '',
                hH: '',
            };
        }
        case 'Seeq': {
            return {
                url: ''
            };
        }
    }
};

export const getLabels = (widgetType) => {
    switch (widgetType) {
        case 'AddWidget': {
            return ['Widget Type']
        }
        case 'Tag': {
            return ['Tag ID'];
        }
        case 'Trigger': {
            return ['Tag ID', 'Controller Tag ID'];
        }
        case 'Time Series': {
            return ['Tag1 ID', 'Tag2 ID', 'Tag3 ID'];
        }
        case 'Middle Gauge': {
            return ['Tag ID', 'LL Value', 'L Value', 'H Value', 'HH Value'];
        }
        case 'Right Gauge': {
            return ['Tag ID', 'LL Value', 'L Value', 'H Value', 'HH Value'];
        }
        case 'Left Gauge': {
            return ['Tag ID', 'LL Value', 'L Value', 'H Value', 'HH Value'];
        }
        case 'Seeq': {
            return ['URL'];
        }
    }
};


function verifyGauges(values) {
    const numericValues = [];
    for (let property in values) {
        if (values.hasOwnProperty(property)) {
            if (!isNaN(values[property])) {
                numericValues.push(+values[property]);
            }
        }
    }

    let correctOrder = true;
    for (let i = 0; i < numericValues.length - 1; i++) {
        if (numericValues[i] > numericValues[i + 1]) {
            correctOrder = false;
            break;
        }
    }

    if (!correctOrder) {
        return {global: "Make sure that LL Value < L Value < H Value < HH Value"};
    }
    return null;
};

export const getVerifyValuesFunction = (widgetType) => {
    switch (widgetType) {
        case 'AddWidget': {
            return (values) => {
                const availableWidgets = ['Tag', 'Trigger', 'Time Series', 'Middle Gauge', 'Right Gauge',
                    'Left Gauge', 'Seeq'];
                const {widget} = values;

                if (!availableWidgets.some(availableWidget => availableWidget === widget)) {
                    return {global: "Make sure to choose a valid widget type"};
                }
                return null;
            }
        }
        case 'Tag': {
            return () => null;
        }
        case 'Trigger': {
            return (values) => {
                if (values.tagId === values.controllerTagId) {
                    return {global: "Tag and its controller should be different"};
                }
                return null;
            };
        }
        case 'Time Series': {
            return (values) => {
                let notEmptyValues = [];
                for (let property in values) {
                    if (values.hasOwnProperty(property)) {
                        if (values[property] === null || values[property] === '') {
                            values[property] = '';
                        } else {
                            notEmptyValues.push(values[property]);
                        }
                    }
                }
            };
        }
        case 'Middle Gauge': {
            return verifyGauges;
        }
        case 'Right Gauge': {
            return verifyGauges;
        }
        case 'Left Gauge': {
            return verifyGauges;
        }
        case 'Seeq': {
            return () => null;
        }
    }
};

function gaugeValidationScheme() {
    const validationSchema = {
        measuredTag: Yup.string().required('Please select tag to measure'),
        lL: Yup.string().required('Please select LL Value or Tag'),
        l: Yup.string().required('Please select L Value or Tag'),
        h: Yup.string().required('Please select H Value or Tag'),
        hH: Yup.string().required('Please select HH Value or Tag'),
    };
    return validationSchema;
}

export const getFormValidationSchemaObject = (widgetType) => {
    switch (widgetType) {
        case 'AddWidget': {
            const validationSchema = {
                widget: Yup.string().required('required'),
            };
            return validationSchema;
        }
        case 'Tag': {
            const validationSchema = {
                tagId: Yup.string().required('required'),
            };
            return validationSchema;
        }
        case 'Trigger': {
            return {
                tagId: Yup.string().required('required'),
                controllerTagId: Yup.string().required('required'),
            };
        }
        case 'Time Series': {
            return {
                tag1Id: Yup.string().nullable(),
                tag2Id: Yup.string().nullable(),
                tag3Id: Yup.string().nullable(),
            };
        }
        case 'Middle Gauge': {
            return gaugeValidationScheme();
        }
        case 'Right Gauge': {
            return gaugeValidationScheme();
        }
        case 'Left Gauge': {
            return gaugeValidationScheme();
        }
        case 'Seeq': {
            const validationSchema = {
                url: Yup.string().required('required'),
            };
            return validationSchema;
        }
    }
};

export const getFormTitle = (widgetType) => {
    switch (widgetType) {
        case 'AddWidget': {
            return 'Choose a Widget to Add'
        }
        case 'Tag': {
            return 'Choose the ID of the Trigger You Wish to Add'
        }
        case 'Trigger': {
            return 'Choose the Values for the Trigger You Wish to Add'
        }
        case 'Time Series': {
            return 'Choose the Values for the Time Series You Wish to Add'
        }
        case 'Middle Gauge': {
            return 'Choose the Values of the Middle Gauge You Wish to Add'
        }
        case 'Right Gauge': {
            return 'Choose the Values of the Right Gauge You Wish to Add'
        }
        case 'Left Gauge': {
            return 'Choose the Values of the Left Gauge You Wish to Add'
        }
        case 'Seeq': {
            return 'Enter the Seeq URL You Wish to Display'
        }
    }
};

export const getHandleFormSubmit = (widgetType) => {
    switch (widgetType) {
        case 'Tag': {
            return () => console.log('Tag Submitted')
        }
        case 'Trigger': {
            return () => console.log('Trigger Submitted')
        }
        case 'Time Series': {
            return () => console.log('Time Series Submitted')
        }
        case 'Middle Gauge': {
            return () => console.log('Middle Gauge Submitted')
        }
        case 'Right Gauge': {
            return () => console.log('Right Gauge Submitted')
        }
        case 'Left Gauge': {
            return () => console.log('Left Gauge Submitted')
        }
        case 'Seeq': {
            return () => console.log('Seeq Submitted')
        }
    }
};