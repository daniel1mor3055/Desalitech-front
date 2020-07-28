import React from 'react';
import { fieldToTextField } from 'formik-material-ui';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const FormikFormControlLabel = ({ textFieldProps, ...props }) => {

    const { form: { setFieldValue }, checked, label } = props;
    const { error, helperText, ...field } = fieldToTextField(props);
    const { name } = field;

    return (
        <FormControlLabel
            {...props}
            {...field}
            control={
                <Checkbox
                    color={'primary'}
                    checked={checked}
                    onChange={(_, value) => setFieldValue(name, value)}
                />}
            label={label}
        />
    );
};

export default FormikFormControlLabel;