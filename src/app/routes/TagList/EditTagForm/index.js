import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = {};

const EditTagForm = ({ tagsList, tagId, tagName, description, units, open, handleClose, handleSubmit }) => (

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
    >
        <>
            <DialogTitle id="form-dialog-title">Edit Your Tag</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        tagId: tagId || '',
                        tagName: tagName || '',
                        description: description || '',
                        units: units || '',
                    }}

                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        setErrors({});
                        const globalError = verifyValues(tagsList, values);
                        if (globalError != null) {
                            setErrors(globalError);
                        } else {
                            setSubmitting(true);
                            try {
                                await handleSubmit(values);
                                handleClose();
                            } catch (error) {
                                setErrors({ global: error.message });
                            }
                        }
                        setSubmitting(false);
                    }}

                    validationSchema={Yup.object().shape({
                        tagId: Yup.string(),
                        tagName: Yup.string().required('Required'),
                        description: Yup.string().required('Required'),
                        units: Yup.string().required('Required'),
                    })}
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
                                {errors.global &&
                                <Typography variant={'subtitle1'} color={'error'} align={'center'}>
                                    {errors.global}
                                </Typography>}
                                <TextField
                                    className='w-50 p-2'
                                    label="Tag ID"
                                    name="tagId"
                                    value={values.tagId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.tagId && touched.tagId) && errors.tagId}
                                    margin="normal"
                                    disabled
                                />

                                <TextField
                                    error={errors.tagName && touched.tagName}
                                    className='w-50 p-2'
                                    label="Tag Name"
                                    name="tagName"
                                    value={values.tagName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.tagName && touched.tagName) && errors.tagName}
                                    margin="normal"
                                />

                                <TextField
                                    error={errors.description && touched.description}
                                    className='w-50 p-2'
                                    label="Tag Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.description && touched.description) && errors.description}
                                    margin="normal"
                                />

                                <TextField
                                    error={errors.units && touched.units}
                                    className='w-50 p-2'
                                    label="Tag Units"
                                    name="units"
                                    value={values.units}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={(errors.units && touched.units) && errors.units}
                                    margin="normal"
                                />
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


EditTagForm.propTypes = {
    tagId: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    units: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = ({ tags }) => {
    return {
        tagsList: tags.tags,
    };
};

function verifyValues(tagsList, values) {
    const { tagName } = values;
    for (let i = 0; i < tagsList.length; i++) {
        if (tagsList[i].tagName === tagName) {
            return { global: `Tag name is already taken` };
        }
    }

    return null;
}

export default connect(mapStateToProps)(withStyles(styles)(EditTagForm));
