import * as Yup from "yup";

export const getInitialValue = (widgetType) => {
    switch (widgetType) {
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
        case 'Tag': {
            return ['Tag ID'];
        }
        case 'Trigger': {
            return ['Tag ID', 'Controller Tag ID'];
        }
        case 'Time Series': {
            return ['Tag1 ID', 'Tag2 ID', 'Tag3 ID'];
        }
        case 'Middle Gauge':
        case 'Right Gauge':
        case 'Left Gauge': {
            return ['Tag ID', 'LL Value', 'L Value', 'H Value', 'HH Value'];
        }
        case 'Seeq': {
            return ['URL'];
        }
    }
};

export const getVerifyValuesFunction = (widgetType, tagList) => {
    switch (widgetType) {
        case 'Tag': {
            return (values) => {
                const {tagId} = values;
                if (!tagList.some(tag => tag.tagId.toLowerCase() === tagId.toLowerCase())) {
                    return {global: "Make sure you provide a valid tag"};
                }
                return null;
            };
        }
        case 'Trigger': {
            return (values) => {
                console.log('values', values);
                const {tagId, controllerTagId} = values;
                if (tagId === controllerTagId) {
                    return {global: "Tag and its controller should be different"};
                }
                if (!tagList.some(tag => tag.tagId.toLowerCase() === tagId.toLowerCase()) ||
                    !tagList.some(tag => tag.tagId.toLowerCase() === controllerTagId.toLowerCase())) {
                    return {global: "Make sure you provide valid tags"};
                }
                return null;
            };
        }
        case 'Time Series': {
            return (values) => {
                let invalidTagsFlag = false;
                let notEmptyValues = [];
                for (let property in values) {
                    if (values.hasOwnProperty(property) && property !== 'widget') {
                        if (values[property] === null || values[property] === '') {
                            values[property] = '';
                        } else {
                            notEmptyValues.push(values[property]);
                        }
                    }
                }
                notEmptyValues.forEach((notEmptyValue) => {
                    if (!tagList.some(tag => tag.tagId.toLowerCase() === notEmptyValue.toLowerCase())) {
                        invalidTagsFlag = true;
                    }
                });
                if (invalidTagsFlag) {
                    return {global: "Make sure you provide valid tags"};
                }
                if ((new Set(notEmptyValues)).size !== notEmptyValues.length) {
                    return {global: 'Tags should be different'};
                }
                if (notEmptyValues.length === 0) {
                    return {global: 'Choose at least one tag'};
                }
                return null;
            };
        }
        case 'Middle Gauge':
        case 'Right Gauge':
        case 'Left Gauge': {
            return (values) => {
                const numericValues = [];
                for (let property in values) {
                    if (values.hasOwnProperty(property)) {
                        if (!isNaN(values[property])) {
                            numericValues.push(+values[property]);
                        } else {
                            if (!tagList.some(tag => tag.tagId.toLowerCase() === values[property].toLowerCase())) {
                                return {global: "Make sure you provide valid tags"};
                            }
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
        }
        case 'Seeq': {
            return () => null;
        }
    }
};

export const getFormValidationSchemaObject = (widgetType) => {
    switch (widgetType) {
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
        case 'Middle Gauge':
        case 'Right Gauge':
        case 'Left Gauge': {
            const validationSchema = {
                measuredTag: Yup.string().required('Please select tag to measure'),
                lL: Yup.string().required('Please select LL Value or Tag'),
                l: Yup.string().required('Please select L Value or Tag'),
                h: Yup.string().required('Please select H Value or Tag'),
                hH: Yup.string().required('Please select HH Value or Tag'),
            };
            return validationSchema;
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
        case 'Tag': {
            return 'Choose the ID of the Trigger You Wish to Add';
        }
        case 'Trigger': {
            return 'Choose the Values for the Trigger You Wish to Add';
        }
        case 'Time Series': {
            return 'Choose the Values for the Time Series You Wish to Add';
        }
        case 'Middle Gauge': {
            return 'Choose the Values of the Middle Gauge You Wish to Add';
        }
        case 'Right Gauge': {
            return 'Choose the Values of the Right Gauge You Wish to Add';
        }
        case 'Left Gauge': {
            return 'Choose the Values of the Left Gauge You Wish to Add';
        }
        case 'Seeq': {
            return 'Enter the Seeq URL You Wish to Display';
        }
    }
};

export const getHandleFormSubmit = (widgetType) => {
    switch (widgetType) {
        case 'Tag': {
            return () => console.log('Tag Submitted');
        }
        case 'Trigger': {
            return () => console.log('Trigger Submitted');
        }
        case 'Time Series': {
            return () => console.log('Time Series Submitted');
        }
        case 'Middle Gauge': {
            return () => console.log('Middle Gauge Submitted');
        }
        case 'Right Gauge': {
            return () => console.log('Right Gauge Submitted');
        }
        case 'Left Gauge': {
            return () => console.log('Left Gauge Submitted');
        }
        case 'Seeq': {
            return () => console.log('Seeq Submitted');
        }
    }
};