import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Formik,} from 'formik';
import * as Yup from 'yup';
import PropTypes from "prop-types";


class EditTagForm extends Component {

    render() {
        const {tagId, tagName, description, units, open, handleClose, handleSubmit} = this.props;
        return (
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
                            onSubmit={async (values, {setSubmitting, setErrors}) => {
                                setSubmitting(true);
                                try {
                                    await handleSubmit(values);
                                    handleClose();
                                } catch (e) {
                                    // setErrors({globalError: error.message});
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
                                        <TextField
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
                                            <Button type={"submit"} color={'primary'} disabled={isSubmitting}>
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
    }
}

EditTagForm.propTypes = {
    tagId: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    units: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default EditTagForm;