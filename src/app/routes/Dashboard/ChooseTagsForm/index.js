import React from 'react';
import {Field, Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import FormikAutocomplete from './FormikAutoComplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux";
import CircularIndeterminate from "app/components/Progress/CircularIndeterminate";
import Typography from "@material-ui/core/Typography";

const styles = {};

const ChooseTagsForm = ({
                            open, handleClose, handleSubmit, tags, fetching, error, initialValues,
                            validationSchemaObject, verifyValues, formTitle, labels, addWidgetFlag, asyncFlag
                        }) => {
    const onSubmitForFormik = asyncFlag ? async (values, {setSubmitting, setErrors}) => {
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
    } : (values, {setSubmitting, setErrors}) => {
        setErrors({});
        const globalError = verifyValues(values);
        if (globalError !== null) {
            setErrors(globalError);
        } else {
            setSubmitting(true);
            try {
                handleSubmit(values);
                handleClose();
            } catch (error) {
                setErrors({global: error.message});
            }
        }
        setSubmitting(false);
    };
    const chooseTagsFormJSX = (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitForFormik}

            validationSchema={Yup.object().shape(validationSchemaObject)}
        >
            {(props) => {
                const {
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    handleReset,
                } = props;

                const options = addWidgetFlag === 'addWidgetFlag' ?
                    ['Tag', 'Trigger', 'Time Series', 'Middle Gauge', 'Right Gauge', 'Left Gauge', 'Seeq'] :
                    tags.map((tag) => (tag.tagId)).sort();
                return (
                    <form onSubmit={handleSubmit}>
                        {errors.global && <Typography variant={'subtitle1'} color={'error'} align={'center'}>
                            {errors.global}
                        </Typography>}
                        {Object.keys(initialValues).map((key, index) => (
                            <FormikAutocomplete
                                name={key}
                                index={index}
                                key={key}
                                options={options}
                                textFieldProps={{
                                    fullWidth: true,
                                    margin: 'normal',
                                    variant: 'outlined',
                                    label: labels[index],
                                    // onChange: handleChange,
                                }}
                            />
                        ))}
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
    );
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <>
                <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
                <DialogContent>
                    {fetching ?
                        error ? <p>{"Coudn't fetch tags"}</p> : <CircularIndeterminate/>
                        : chooseTagsFormJSX}
                </DialogContent>
            </>
        </Dialog>
    );
};


ChooseTagsForm.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    formTitle: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.arrayOf(PropTypes.object).isRequired,
    validationSchemaObject: PropTypes.object.isRequired,
    verifyValues: PropTypes.func.isRequired,
};

const mapStateToProps = ({tags}) => {
    return {
        tags: tags.tags,
        fetching: tags.fetching,
        error: tags.error,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ChooseTagsForm));