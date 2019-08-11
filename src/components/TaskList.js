import React from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'semantic-ui-react';
import { TASKS_UPDATE } from '../redux/actions/tasks';

const _ = require('lodash');

class TaskList extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = { tasks: [ ] };
        this._handle_delete = this._handle_delete.bind(this);
    }
    
    async componentDidMount() {
        const tasks = await (await fetch('http://localhost:5000/tasks/')).json();
        this.props.update({ tasks });
    }
    
    componentDidUpdate() {
        this.setState({ tasks: this.props.tasks });
    }
    
    async _handle_delete(item) {
        const { tasks } = this.state;
        _.remove(tasks, await (await fetch(`http://localhost:5000/tasks/${item._id.$oid}`, { method: 'delete', mode: 'cors' })).json());
        this.setState({ tasks }, () => this.forceUpdate());
        this.props.update({ tasks });
    }
    
    renderTasks() {
        return this.state.tasks.map(el => (
            <List.Item key={el._id.$oid}>
                <List.Content floated='right'>
                    <Button icon="trash" onClick={this._handle_delete.bind(this, el)}/>
                </List.Content>
                <List.Content>
                    <List.Header>{el.name}</List.Header>
                    <List.Description>{new Date(el.expire_at.$date.$numberLong).toLocaleDateString()}&nbsp;:&nbsp;{el.description}</List.Description>
                </List.Content>
            </List.Item>
        ));
    }
    
    render() {
        return (
            <List divided verticalAlign='middle'>
                {this.renderTasks()}
            </List>
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
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
