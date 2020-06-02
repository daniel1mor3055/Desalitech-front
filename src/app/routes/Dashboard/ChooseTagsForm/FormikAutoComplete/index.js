import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 300,
    },
    clearIndicator: {
        visibility: 'hidden !important',
    },
    clearIndicatorDirty: {
        visibility: 'hidden !important',
    },
}));

const FormikAutocomplete = props => {
    const { handleKeyPress, index, name, options, textFieldProps } = props;
    const classes = useStyles();
    const { isSubmitting } = useFormikContext();
    const fieldProps = useField(name);
    const [field, meta, helpers] = fieldProps;

    return (
        <Autocomplete
            freeSolo
            selectOnFocus={true}
            forcePopupIcon={true}
            className={classes.formControl}
            classes={{
                clearIndicator: classes.clearIndicator,
                clearIndicatorDirty: classes.clearIndicatorDirty,
            }}
            disabled={isSubmitting}
            options={options}
            {...field}
            onChange={(event, value) => {
                helpers.setValue(value);
            }}
            onBlur={() => helpers.setTouched(true)}
            renderInput={params => (
                <TextField
                    autoFocus={field.value === '' && index !== 0}
                    {...params}
                    inputProps={{ ...params.inputProps }}
                    className={classes.formControl}
                    {...textFieldProps}
                    onChange={event => {
                        const value = event.target.value;
                        helpers.setValue(value);
                    }}
                    // onKeyPress={event => {
                    //     handleKeyPress(event);
                    // }}
                />
            )}
        />
    );
};

export default FormikAutocomplete;