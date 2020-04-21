import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = {};

const FormSeeq = ({ open, handleClose, handleSubmit, initialValues }) => {
    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth={'xs'}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <>
                <DialogTitle id="form-dialog-title">Enter valid seeq url</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues == null ? {
                            url: '',
                        } : initialValues}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            setSubmitting(true);
                            try {
                                await handleSubmit(values);
                                handleClose();
                            } catch (error) {
                                setErrors({ global: error.message });
                            }
                            setSubmitting(false);
                        }}

                        validationSchema={Yup.object().shape({
                            url: Yup.string().url().required('required'),
                        })}
                    >
                        {(props) => {
                            const {
                                errors,
                                handleBlur,
                                handleChange,
                                touched,
                                dirty,
                                values,
                                isSubmitting,
                                handleSubmit,
                                handleReset,
                            } = props;

                            return (
                                <form onSubmit={handleSubmit}>
                                    {errors.global &&
                                    <Typography variant={'subtitle1'} color={'error'} align={'center'}>
                                        {errors.global}
                                    </Typography>}
                                    <TextField
                                        error={errors.url && touched.url}
                                        label="URL"
                                        name="url"
                                        value={values.url}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        helperText={(errors.url && touched.url) && errors.url}
                                        margin="normal"/>

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

FormSeeq.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
};

export default withStyles(styles)(FormSeeq);