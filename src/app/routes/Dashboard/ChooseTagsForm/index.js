import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Field} from 'formik';

import FormikAutocomplete from './FormikAutoComplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';

const styles = {};

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];

const ChooseTagsForm = ({tagsIds, open, handleClose, handleSubmit, numberOfFields, backgroundTags}) => {
    const getInitialValues = (tagsIds, numberOfFields) => {
        let initialValues = {};
        for (let i = 0; i < numberOfFields; i++) {
            if (i < tagsIds.length) {
                initialValues[`tag${i}Id`] = tagsIds[i];
            } else {
                initialValues[`tag${i}Id`] = '';
            }
        }
        return initialValues;
    };

    const getValidationSchemaObject = (initialValues) => {
        let validationSchema = {};
        for (let property in initialValues) {
            if (Object.prototype.hasOwnProperty.call(initialValues, property)) {
                validationSchema[property] = Yup.string().nullable();
            }
        }
        return validationSchema;
    };


    const initialValues = getInitialValues(tagsIds, numberOfFields);


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <>
                <DialogTitle id="form-dialog-title">Choose Your Tags</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={async (values, {setSubmitting, setErrors}) => {
                            // Should check here if at least one field is not empty
                            // should check if all chosen tags are different
                            setSubmitting(true);
                            try {
                                await handleSubmit(values);
                                handleClose();
                            } catch (e) {
                                // setErrors({globalError: error.message});
                            }
                            setSubmitting(false);
                        }}

                        validationSchema={Yup.object().shape(getValidationSchemaObject(initialValues))}
                    >
                        {(props) => {
                            const {
                                values,
                                touched,
                                errors,
                                dirty,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                handleReset,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    {Object.keys(initialValues).map((key, index) => (
                                        <Field name={key}
                                               key={key}
                                               label={`Tag${index+1} ID`}
                                               component={FormikAutocomplete}
                                               options={options}
                                               textFieldProps={{
                                                   fullWidth: true,
                                                   margin: 'normal',
                                                   variant: 'outlined',
                                                   label: `Tag${index+1} ID`
                                               }}
                                        />
                                    ))}
                                    {/*<TextField*/}
                                    {/*    label="Tag ID"*/}
                                    {/*    name="tagId"*/}
                                    {/*    value={values.tagId}*/}
                                    {/*    onChange={handleChange}*/}
                                    {/*    onBlur={handleBlur}*/}
                                    {/*    helperText={(errors.tagId && touched.tagId) && errors.tagId}*/}
                                    {/*    margin="normal"*/}
                                    {/*    disabled*/}
                                    {/*/>*/}
                                    <DialogActions>
                                        <Button
                                            type="button"
                                            className="outline"
                                            color={'secondary'}
                                            onClick={handleReset}
                                            disabled={!dirty || isSubmitting}
                                        >
                                            Reset
                                        </Button>
                                        <Button type={"submit"} color={'primary'} disabled={isSubmitting || !dirty}>
                                            Save
                                        </Button>
                                    </DialogActions>
                                </form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </>
        </Dialog>
    );
};


ChooseTagsForm.propTypes = {
    tagsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    numberOfFields: PropTypes.number.isRequired,
    backgroundTags: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(styles)(ChooseTagsForm);