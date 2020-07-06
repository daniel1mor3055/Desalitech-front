import React from 'react';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import FormikNewAutocomplete from "app/components/FormikAutoComplete";
import Typography from "@material-ui/core/Typography";
import {connect} from "react-redux";

const styles = {};

const FormTimeSeries = ({open, handleClose, handleSubmit, tagsList, initialValues}) => {
    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth={'xs'}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <>
                <DialogTitle id="form-dialog-title">Enter tag names to view</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues == null ? {
                            tag1Name: '',
                            tag2Name: '',
                            tag3Name: '',
                        } : initialValues}
                        onSubmit={async (values, {setSubmitting, setErrors}) => {
                            setErrors({});
                            const globalError = verifyValues(values);
                            if (globalError !== null) {
                                setErrors(globalError);
                            } else {
                                setSubmitting(true);
                                try {
                                    await handleSubmit(values);
                                    handleClose();
                                } catch (error) {
                                    setErrors({global: error.message});
                                }
                            }
                            setSubmitting(false);
                        }}

                        validationSchema={Yup.object().shape({
                            tag1Name: Yup.string().nullable(),
                            tag2Name: Yup.string().nullable(),
                            tag3Name: Yup.string().nullable(),
                        })}
                    >
                        {(props) => {
                            const {
                                errors,
                                dirty,
                                isSubmitting,
                                handleSubmit,
                                handleReset,
                            } = props;

                            const options = tagsList.map((tag) => (tag.tagName)).sort();
                            const textFieldProps = {
                                fullWidth: true,
                                margin: 'normal',
                                variant: 'outlined',
                            };
                            return (
                                <form onSubmit={handleSubmit}>
                                    {errors.global &&
                                    <Typography variant={'subtitle1'} color={'error'} align={'center'}>
                                        {errors.global}
                                    </Typography>}
                                    <Field name='tag1Name' component={FormikNewAutocomplete} label="Tag 1 Name"
                                           options={options}
                                           textFieldProps={textFieldProps}/>
                                    <Field name='tag2Name' component={FormikNewAutocomplete} label="Tag 2 Name"
                                           options={options}
                                           textFieldProps={textFieldProps}/>
                                    <Field name='tag3Name' component={FormikNewAutocomplete} label="Tag 3 Name"
                                           options={options}
                                           textFieldProps={textFieldProps}/>


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
        </Dialog>);
};

FormTimeSeries.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

const mapStateToProps = ({tags}) => {
    return {
        tagsList: tags.tags,
        fetching: tags.fetching,
        error: tags.error,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(FormTimeSeries));

function verifyValues(values) {
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

    if ((new Set(notEmptyValues)).size !== notEmptyValues.length) {
        return {global: 'Tag names should be different'};
    }
    if (notEmptyValues.length === 0) {
        return {global: 'Choose at least one tag'};
    }

    return null;
}