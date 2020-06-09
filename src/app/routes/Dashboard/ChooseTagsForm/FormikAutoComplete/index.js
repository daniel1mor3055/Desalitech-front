import React from 'react';
import {Autocomplete} from '@material-ui/lab';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useField, useFormikContext} from 'formik';

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 300,
    },
}));

const FormikAutocomplete = props => {
    const {index, name, options, textFieldProps} = props;
    const classes = useStyles();
    const {isSubmitting} = useFormikContext();
    const fieldProps = useField(name);
    const field = fieldProps[0];
    const helpers = fieldProps[2];

    return (
        <Autocomplete
            freeSolo
            selectOnFocus={true}
            autoSelect={true}
            forcePopupIcon={true}
            className={classes.formControl}
            disabled={isSubmitting}
            options={options}
            {...field}
            onChange={(event, value) => {
                helpers.setValue(value);
                helpers.setTouched(true);
            }}
            onBlur={() => helpers.setTouched(true)}
            renderInput={params => (
                <TextField
                    autoFocus={field.value === '' && index !== 0}
                    {...params}
                    inputProps={{...params.inputProps}}
                    className={classes.formControl}
                    {...textFieldProps}
                    onChange={event => {
                        const value = event.target.value;
                        helpers.setValue(value);
                        helpers.setTouched(true);
                    }}
                />
            )}
        />
    );
};

export default FormikAutocomplete;