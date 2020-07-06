import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';

const styles = {};

const FormDelete = ({open, handleClose, handleSubmit}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <>
                <DialogTitle id="form-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{}}
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

                        validationSchema={Yup.object().shape({})}>
                        {(props) => {
                            const {
                                isSubmitting,
                                handleSubmit,
                            } = props;

                            return (
                                <form onSubmit={handleSubmit}>
                                    <DialogActions>
                                        <Button
                                            type="button"
                                            className="outline"
                                            color={'secondary'}
                                            onClick={handleClose}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type={"submit"} color={'primary'} disabled={isSubmitting}>
                                            Confirm
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

FormDelete.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormDelete);