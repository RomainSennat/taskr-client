import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TASKS_UPDATE } from '../redux/actions/tasks';
import { connect } from 'react-redux';

class TaskAddForm extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = { loading: false };
        this._handle_submit = this._handle_submit.bind(this);
    }
    
    async _handle_submit(values, { resetForm }) {
        this.setState({ loading: !this.state.loading });
        this.clear(values);
        if (values.expire_at) {
            values.expire_at = new Date(values.expire_at);
        }
        try {
            const options = {
                body: JSON.stringify(values),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'  },
                method: 'post',
                mode: 'cors'
            };
            const { tasks } = this.props;
            const { _id } = await (await fetch('http://localhost:5000/tasks/', options)).json();
            tasks.push(await (await fetch(`http://localhost:5000/tasks/${_id.$oid}`)).json());
            this.props.update({ tasks });
            resetForm({ });
        } catch (error) { }
        this.setState({ loading: !this.state.loading });
    }
    
    clear(obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] === '') {
                    delete obj[key];
                }
            }
        }
    }
    
    renderForm({ errors, handleChange, handleBlur, handleSubmit, isValid, values }) {
        const commons = { onChange: handleChange, onBlur: handleBlur };
        return (
            <Form onSubmit={handleSubmit}>
                <Form.Input id='task-name'
                            label='Nom'
                            name='name'
                            placeholder='Saisir un nom'
                            required
                            error={values.name && errors.name ? errors.name : null}
                            value={values.name || ''}
                            {...commons}
                />
                <Form.TextArea id='task-description'
                               label='Description'
                               name='description'
                               placeholder='Saisir une description'
                               required
                               error={values.description && errors.description ? errors.description : null}
                               value={values.description || ''}
                               {...commons}
                />
                <Form.Input id='task-expire-at'
                            label='Date d&#39;expiration'
                            name='expire_at'
                            placeholder='Choisir une date'
                            type='date'
                            error={values.expire_at && errors.expire_at ? errors.expire_at : null}
                            value={values.expire_at || ''}
                            {...commons}
                />
                <Button disabled={!isValid || this.state.loading} loading={this.state.loading} type='submit'>Ajouter</Button>
            </Form>
        );
    }
    
    render() {
        const inital = { name: '', description: '', expire_at: '' };
        const schema = yup.object().shape({
            name: yup.string().trim().min(1).required('Le nom est requis.'),
            description: yup.string().trim().min(1).required('La description est requise.'),
            expire_at: yup.date().min(new Date(), 'La date d\'expiration ne peut pas être antérieur à la date du jour.')
        });
        return (
            <Formik initialValues={inital} validationSchema={schema} onSubmit={this._handle_submit}>
                {props => this.renderForm(props)}
            </Formik>
        );
    }
    
}

const mapStateToProps = ({ tasks }) => {
    return tasks;
};

const mapDispatchToProps = (dispatch) => {
    return {
        update: (payload) => {
            dispatch({ type: TASKS_UPDATE, payload })
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskAddForm);
