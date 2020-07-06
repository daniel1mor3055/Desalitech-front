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

const FormTag = ({open, handleClose, handleSubmit, initialValues, tagsList}) => {
    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth={'xs'}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <>
                <DialogTitle id="form-dialog-title">Enter tag name</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues == null ? {
                            tagName: '',
                        } : initialValues}
                        onSubmit={async (values, {setSubmitting, setErrors}) => {
                            setSubmitting(true);
                            try {
                                await handleSubmit(values);
                                handleClose();
                            } catch (error) {
                                setErrors({global: error.message});
                            }
                            setSubmitting(false);
                        }}

                        validationSchema={Yup.object().shape({
                            tagName: Yup.string(),
                        })}
                    >
                        {(props) => {
                            const {
                                errors,
                                dirty,
                                isSubmitting,
                                handleSubmit,
                                handleReset,
                                values,
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
                                    <Field
                                        name='tagName'
                                        component={FormikNewAutocomplete}
                                        label="Tag Name"
                                        options={options}
                                        disableClearable
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
                                        <Button type={"submit"} color={'primary'}
                                                disabled={isSubmitting || !dirty}>
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

FormTag.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

const mapStateToProps = ({tags}) => {
    return {
        tagsList: tags.tags,
        fetching: tags.fetching,
        error: tags.error,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(FormTag));