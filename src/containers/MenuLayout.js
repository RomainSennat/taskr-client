import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import { TASKS_UPDATE } from '../redux/actions/tasks';

class MenuLayout extends React.Component {
    
    constructor(props) {
        super(props);
        this._handle_add = this._handle_add.bind(this);
    }
    
    async _handle_add() {
        const body = JSON.stringify({
            name: 'Nom de la tâche',
            description: 'Description de la tâche',
            expire_at: new Date()
        });
        const options = {
            method: 'post',
            mode: 'cors',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const { tasks } = this.props;
        const { _id } = await (await fetch('http://localhost:5000/tasks/', options)).json();
        tasks.push(await (await fetch(`http://localhost:5000/tasks/${_id.$oid}`)).json());
        this.props.update({ tasks });
    }
    
    render() {
        return (
            <div>
                <Menu inverted color='teal' fixed='top' pointing secondary>
                    <Menu.Item as={Link} to='/' header name='home'>TaskR</Menu.Item>
                    <Menu.Item as={Link} to='/' header name='task_list'>Liste des tâches</Menu.Item>
                    <Menu.Item as={Link} to='/' name='add_task' position='right' onClick={this._handle_add}>
                        <Icon name='plus'></Icon>
                        Ajouter
                    </Menu.Item>
                </Menu>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MenuLayout);
