import React, { Component } from 'react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import FormikAutocomplete from "app/components/FormikAutoComplete";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import FormikFormControlLabel from "app/components/FormikFormControlLabel";
import TextField from "@material-ui/core/TextField";
import './index.scss';

const styles = {};

class FormGauge extends Component {
    render() {
        const { open, handleClose, handleSubmit, initialValues, tagsList } = this.props;

        return (
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'sm'}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <>
                    <DialogTitle id="form-dialog-title">Enter gauge parameters</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={initialValues == null ? {
                                measuredTag: '',
                                lLFromOptionsCheckBox: true,
                                lLFromOptions: '',
                                lL: '',
                                lFromOptionsCheckBox: true,
                                lFromOptions: '',
                                l: '',
                                hFromOptionsCheckBox: true,
                                hFromOptions: '',
                                h: '',
                                hHFromOptionsCheckBox: true,
                                hHFromOptions: '',
                                hH: '',
                            } : initialValues}
                            onSubmit={async (values, { setSubmitting, setErrors }) => {
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
                                        setErrors({ global: error.message });
                                    }
                                }
                                setSubmitting(false);
                            }}

                            validationSchema={Yup.object().shape({
                                measuredTag: Yup.string().required('Please select tag name to measure'),
                                lLFromOptionsCheckBox: Yup.bool(),
                                lLFromOptions: Yup.string(),
                                lL: Yup.number(),
                                lFromOptionsCheckBox: Yup.bool(),
                                lFromOptions: Yup.string(),
                                l: Yup.number(),
                                hFromOptionsCheckBox: Yup.bool(),
                                hFromOptions: Yup.string(),
                                h: Yup.number(),
                                hHFromOptionsCheckBox: Yup.bool(),
                                hHFromOptions: Yup.string(),
                                hH: Yup.number(),
                            })}
                        >
                            {(props) => {
                                const {
                                    values,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleSubmit,
                                    handleReset,
                                    handleChange,
                                    handleBlur,
                                    touched,
                                } = props;


                                const options = tagsList.map((tag) => (tag.tagName)).sort();
                                const textFieldProps = {
                                    fullWidth: true,
                                    margin: 'normal',
                                    variant: 'outlined',
                                };

                                return (
                                    <form onSubmit={handleSubmit} className={'FormGauge'}>
                                        {errors.global &&
                                        <Typography variant={'subtitle1'} color={'error'} align={'center'}>
                                            {errors.global}
                                        </Typography>}
                                        <Field name='measuredTag' component={FormikAutocomplete} label="Measured Tag"
                                               options={options}
                                               disableClearable
                                               textFieldProps={textFieldProps}/>
                                        <Field
                                            name='lLFromOptionsCheckBox'
                                            component={FormikFormControlLabel}
                                            label="Choose LL value from Tag List"
                                            checked={values.lLFromOptionsCheckBox}/>

                                        <div className={'w-100 d-flex justify-content-between'}>
                                            <Field name='lLFromOptions' component={FormikAutocomplete}
                                                   className='FormGauge-field'
                                                   label="LL Value"
                                                   options={options}
                                                   disabled={!values.lLFromOptionsCheckBox}
                                                   textFieldProps={textFieldProps}/>

                                            <TextField
                                                className='FormGauge-field'
                                                error={errors.lL && touched.lL}
                                                label="LL Value"
                                                name="lL"
                                                value={values.lL}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.lL && touched.lL) && errors.lL}
                                                margin="normal"
                                                disabled={values.lLFromOptionsCheckBox}
                                            />
                                        </div>

                                        <Field
                                            name='lFromOptionsCheckBox'
                                            component={FormikFormControlLabel}
                                            label="Choose L value from Tag List"
                                            checked={values.lFromOptionsCheckBox}/>

                                        <div className={'w-100 d-flex justify-content-between'}>
                                            <Field name='lFromOptions' component={FormikAutocomplete} label="L Value"
                                                   options={options}
                                                   className='FormGauge-field'
                                                   disabled={!values.lFromOptionsCheckBox}
                                                   textFieldProps={textFieldProps}/>

                                            <TextField
                                                className='FormGauge-field'
                                                error={errors.l && touched.l}
                                                label="L Value"
                                                name="l"
                                                value={values.l}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.l && touched.l) && errors.l}
                                                margin="normal"
                                                disabled={values.lFromOptionsCheckBox}
                                            />
                                        </div>

                                        <Field
                                            name='hFromOptionsCheckBox'
                                            component={FormikFormControlLabel}
                                            label="Choose H value from Tag List"
                                            checked={values.hFromOptionsCheckBox}/>

                                        <div className={'w-100 d-flex justify-content-between'}>
                                            <Field name='hFromOptions' component={FormikAutocomplete} label="H Value"
                                                   options={options}
                                                   className='FormGauge-field'
                                                   disabled={!values.hFromOptionsCheckBox}
                                                   textFieldProps={textFieldProps}/>

                                            <TextField
                                                className='FormGauge-field'
                                                error={errors.h && touched.h}
                                                label="H Value"
                                                name="h"
                                                value={values.h}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.h && touched.h) && errors.h}
                                                margin="normal"
                                                disabled={values.hFromOptionsCheckBox}
                                            />
                                        </div>
                                        <Field
                                            name='hHFromOptionsCheckBox'
                                            component={FormikFormControlLabel}
                                            label="Choose HH value from Tag List"
                                            checked={values.hHFromOptionsCheckBox}/>

                                        <div className={'w-100 d-flex justify-content-between'}>
                                            <Field name='hHFromOptions' component={FormikAutocomplete}
                                                   label="HH Value"
                                                   options={options}
                                                   className='FormGauge-field'
                                                   disabled={!values.hHFromOptionsCheckBox}
                                                   textFieldProps={textFieldProps}/>

                                            <TextField
                                                className='FormGauge-field'
                                                error={errors.hH && touched.hH}
                                                label="HH Value"
                                                name="hH"
                                                value={values.hH}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.hH && touched.hH) && errors.hH}
                                                margin="normal"
                                                disabled={values.hHFromOptionsCheckBox}
                                            />
                                        </div>

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
    }
}

FormGauge.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
};

const mapStateToProps = ({ tags }) => {
    return {
        tagsList: tags.tags,
        fetching: tags.fetching,
        error: tags.error,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(FormGauge));

function verifyValues(values) {
    const {
        lLFromOptionsCheckBox, lFromOptionsCheckBox, hFromOptionsCheckBox, hHFromOptionsCheckBox,
        lL, l, h, hH, lLFromOptions, lFromOptions, hFromOptions, hHFromOptions
    } = values;
    const thresholdValues = [lL, l, h, hH];
    const thresholdTags = [lLFromOptions, lFromOptions, hFromOptions, hHFromOptions];
    const CheckboxesArray = [lLFromOptionsCheckBox, lFromOptionsCheckBox, hFromOptionsCheckBox, hHFromOptionsCheckBox];

    const numericValues = [];

    for (let i = 0; i < CheckboxesArray.length; i++) {
        if (!CheckboxesArray[i]) {
            numericValues.push(+thresholdValues[i]);
        }
        if ((thresholdValues[i] === '' || thresholdValues[i] == null) &&
            (thresholdTags[i] === '' || thresholdTags[i] == null)) {
            return { global: "Each value has to be a tag name or a numerical value" };
        }
    }
    for (let i = 0; i < numericValues.length - 1; i++) {
        if (numericValues[i] > numericValues[i + 1]) {
            return { global: "Make sure that LL Value < L Value < H Value < HH Value" };
        }
    }

    return null;
}