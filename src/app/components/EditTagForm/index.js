import React from 'react';
import {Form, withFormik} from "formik";
import * as yup from 'yup';
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";


const FormikEditTagFormWrapper = props => {
    const {postTag} = props;

    const FormikEditTagForm = withFormik({
        mapPropsToValues: ({tagId, tagName, description, units}) => {
            return {
                tagId: tagId || '',
                tagName: tagName || '',
                description: description || '',
                units: units || '',
                apiError: null,
            };
        },
        validationSchema: yup.object().shape({
            tagId: yup.string(),
            tagName: yup.string().required('Tag name is required'),
            description: yup.string().required('Tag description is required'),
            units: yup.string().required('Tag units is required'),
        }),
        handleSubmit: async (values, {resetForm, setErrors, setSubmitting}) => {
            try {
                const response = await postTag(values);
                resetForm();
            } catch (error) {
                setErrors({apiError: error.message});
            }
            setSubmitting(false);
        }
    })(EditTagForm);


    return <FormikEditTagForm {...props}/>;
};


FormikEditTagFormWrapper.propTypes = {
    tagId: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    units: PropTypes.string.isRequired,
    postTag: PropTypes.func.isRequired,
};

export default FormikEditTagFormWrapper;

function EditTagForm({values,errors, touched, isSubmitting,handleChange}) {
    return (
        <Form>
            {errors.apiError && <p>{errors.apiError}</p>}
            <div>
                {touched.tagId && errors.tagId && <p>{errors.tagId}</p>}
                <TextField
                    id="tagId"
                    name={"tagId"}
                    label={"Tag ID"}
                    value={values.tagId}
                    onChange={handleChange}
                    disabled={true}
                    type="text"
                    margin="normal"
                    fullWidth
                />
                {/*<Field type={'text'} name={'tagId'} placeholder={'Tag ID'} disabled={true}/>*/}
            </div>
            <div>
                {touched.tagName && errors.tagName && <p>{errors.tagName}</p>}
                <TextField
                    id="tagName"
                    name={"tagName"}
                    value={values.tagName}
                    onChange={handleChange}
                    label={"Tag name"}
                    type="text"
                    margin="normal"
                    fullWidth
                />
                {/*<Field type={'text'} name={'tagName'} placeholder={'Tag name'}/>*/}
            </div>
            <div>
                {touched.description && errors.description && <p>{errors.description}</p>}
                <TextField
                    id="description"
                    name={"description"}
                    label={"Tag description"}
                    value={values.description}
                    onChange={handleChange}
                    type="text"
                    margin="normal"
                    fullWidth
                />
                {/*<Field type={'text'} name={'description'} placeholder={'Tag description'}/>*/}
            </div>
            <div>
                {/*maybe its better to do this a scroll down menu*/}
                {touched.units && errors.units && <p>{errors.units}</p>}
                <TextField
                    id="units"
                    name={"units"}
                    label={"Tag units"}
                    value={values.units}
                    onChange={handleChange}
                    type="text"
                    margin="normal"
                    fullWidth
                />
                {/*<Field type={'text'} name={'units'} placeholder={'Tag units'}/>*/}
            </div>
            <button disabled={isSubmitting}>Submit</button>
        </Form>
    );
}