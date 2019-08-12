import React from 'react';
import { Button, List } from 'semantic-ui-react';

export default class TaskItem extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this._handle_delete = this._handle_delete.bind(this);
    }
    
    _handle_delete() {
        this.props.onDelete && this.props.onDelete();
    }
    
    renderDescription(task) {
        if (task.expire_at) {
            return <List.Description>{new Date(task.created_at.$date.$numberLong).toLocaleDateString()}&nbsp;({new Date(task.expire_at.$date.$numberLong).toLocaleDateString()})&nbsp;:&nbsp;{task.description}</List.Description>
        }
        return <List.Description>{new Date(task.created_at.$date.$numberLong).toLocaleDateString()}&nbsp;:&nbsp;{task.description}</List.Description>
    }
    
    render() {
        return (
            <List.Item>
                <List.Content floated='right'>
                    <Button icon='trash' onClick={this._handle_delete}/>
                </List.Content>
                <List.Content>
                    <List.Header>{this.props.task.name}</List.Header>
                    {this.renderDescription(this.props.task)}
                </List.Content>
            </List.Item>
        );
    }
    
}
