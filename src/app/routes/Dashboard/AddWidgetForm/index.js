// import React from 'react';
// import {Field, Formik} from 'formik';
// import * as Yup from 'yup';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import {withStyles} from '@material-ui/core/styles';
// import FormikNewAutocomplete from "app/components/FormikAutoComplete";
// import Typography from "@material-ui/core/Typography";
//
// const styles = {};
//
// const AddWidgetForm = ({open, handleClose, handleSubmit, selectedWidgetType}) => {
//     const initialValues = {
//         timeSeries: {
//             tag1Name: '',
//             tag2Name: '',
//             tag3Name: '',
//         },
//         leftGauge: {
//             measuredTag: '',
//             lL: '',
//             l: '',
//             h: '',
//             hH: '',
//         },
//         rightGauge: {
//             measuredTag: '',
//             lL: '',
//             l: '',
//             h: '',
//             hH: '',
//         },
//         middleGauge: {
//             measuredTag: '',
//             lL: '',
//             l: '',
//             h: '',
//             hH: '',
//         },
//         seeq: {
//             url: ''
//         },
//         tag: {
//             tagName: ''
//         },
//         trigger: {
//             tagName: '',
//             controllerTagName: '',
//         }
//     };
//
//     const validationSchemas = {
//         timeSeries: {
//             tag1Name: Yup.string().nullable(),
//             tag2Name: Yup.string().nullable(),
//             tag3Name: Yup.string().nullable(),
//         },
//         leftGauge: {
//             measuredTag: Yup.string().required('Please select tag to measure'),
//             lL: Yup.string().required('Please select LL value or tag name'),
//             l: Yup.string().required('Please select L value or tag name'),
//             h: Yup.string().required('Please select H value or tag name'),
//             hH: Yup.string().required('Please select HH value or tag name'),
//         },
//         rightGauge: {
//             measuredTag: Yup.string().required('Please select tag to measure'),
//             lL: Yup.string().required('Please select LL value or tag name'),
//             l: Yup.string().required('Please select L value or tag name'),
//             h: Yup.string().required('Please select H value or tag name'),
//             hH: Yup.string().required('Please select HH value or tag name'),
//         },
//         middleGauge: {
//             measuredTag: Yup.string().required('Please select tag to measure'),
//             lL: Yup.string().required('Please select LL value or tag name'),
//             l: Yup.string().required('Please select L value or tag name'),
//             h: Yup.string().required('Please select H value or tag name'),
//             hH: Yup.string().required('Please select HH value or tag name'),
//         },
//         seeq: {
//             url: Yup.string().required('required'),
//         },
//         tag: {
//             tagName: Yup.string().required('required'),
//         },
//         trigger: {
//             tagName: Yup.string().required('required'),
//             controllerTagName: Yup.string().required('required'),
//         }
//     };
//
//     const labels = {
//         timeSeries: ['Tag1 Name', 'Tag2 Name', 'Tag3 Name'],
//         leftGauge: ['Tag Name', 'LL Value', 'L Value', 'H Value', 'HH Value'],
//         rightGauge: ['Tag Name', 'LL Value', 'L Value', 'H Value', 'HH Value'],
//         middleGauge: ['Tag Name', 'LL Value', 'L Value', 'H Value', 'HH Value'],
//         seeq: ['URL'],
//         tag: ['Tag Name'],
//         trigger: ['Tag Name', 'Controller Tag Name'],
//     };
//
//     const fieldsToRender = {
//         timeSeries: Object.keys(initialValues['timeSeries']).map()
//             [
//             <Field name='widgetType' component={FormikNewAutocomplete} label="Widget Type"
//                    options={['Time Series', 'Left Gauge', 'Middle Gauge', 'Right Gauge', 'Seeq link', 'Tag', 'Trigger']}
//                 // textFieldProps={{fullWidth: true, margin: 'normal', variant: 'outlined'}}
//             />,
//         ],
//
//     }
//
//
//     return (
//         <Dialog
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="form-dialog-title"
//         >
//             <>
//                 <DialogTitle id="form-dialog-title">Choose widget to add</DialogTitle>
//                 <DialogContent>
//                     <Formik
//                         initialValues={initialValues[selectedWidgetType]}
//                         onSubmit={async (values, {setSubmitting, setErrors}) => {
//                             setSubmitting(true);
//                             try {
//                                 await handleSubmit(values);
//                                 handleClose();
//                             } catch (error) {
//                                 setErrors({globalError: error.message});
//                             }
//                             setSubmitting(false);
//                         }}
//
//                         validationSchema={validationSchemas[selectedWidgetType]}
//                     >
//                         {(props) => {
//                             const {
//                                 values,
//                                 touched,
//                                 errors,
//                                 dirty,
//                                 isSubmitting,
//                                 handleChange,
//                                 handleBlur,
//                                 handleSubmit,
//                                 handleReset,
//                             } = props;
//                             return (
//                                 <form onSubmit={handleSubmit}>
//                                     <Field name='widgetType' component={FormikNewAutocomplete} label="Widget Type"
//                                            options={['Time Series', 'Left Gauge', 'Middle Gauge', 'Right Gauge', 'Seeq link', 'Tag', 'Trigger']}
//                                         // textFieldProps={{fullWidth: true, margin: 'normal', variant: 'outlined'}}
//                                     />
//
//                                     {errors.global &&
//                                     <Typography variant={'subtitle1'} color={'error'} align={'center'}>
//                                         {errors.global}
//                                     </Typography>}
//                                     {Object.keys(values).map((key, index) => (
//                                         <FormikAutocomplete
//                                             name={key}
//                                             index={index}
//                                             key={key}
//                                             options={optionsFlag === 'seeq' ? [] : tags.map((tag) => (tag.tagName)).sort()}
//                                             textFieldProps={{
//                                                 fullWidth: true,
//                                                 margin: 'normal',
//                                                 variant: 'outlined',
//                                                 label: labels[index],
//                                                 // onChange: handleChange,
//                                             }}
//                                         />
//                                     ))}
//
//
//                                     <DialogActions>
//                                         <Button
//                                             type="button"
//                                             className="outline"
//                                             color={'secondary'}
//                                             onClick={handleReset}
//                                             disabled={!dirty || isSubmitting}
//                                         >
//                                             Reset
//                                         </Button>
//                                         <Button type={"submit"} color={'primary'} disabled={isSubmitting}>
//                                             Save
//                                         </Button>
//                                     </DialogActions>
//                                 </form>
//                             );
//                         }}
//                     </Formik>
//                 </DialogContent>
//             </>
//         </Dialog>);
// };
//
// AddWidgetForm.propTypes = {
//     open: PropTypes.bool.isRequired,
//     handleClose: PropTypes.func.isRequired,
//     handleSubmit: PropTypes.func.isRequired,
//     selectedWidgetType: PropTypes.string.isRequired,
// };
//
// export default withStyles(styles)(AddWidgetForm);