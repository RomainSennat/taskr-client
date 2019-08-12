import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class MenuLayout extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <Menu color='teal' fixed='top' pointing secondary>
                    <Menu.Item as={Link} to='/' header active={this.props.location.pathname === '/'} name='home'>TaskR</Menu.Item>
                    <Menu.Item as={Link} to='/tasks' active={this.props.location.pathname === '/tasks'} name='task_list'>Liste des tâches</Menu.Item>
                    <Menu.Item as={Link} to='/add' active={this.props.location.pathname === '/add'} name='add_task' position='right'>Ajouter une tâche</Menu.Item>
                </Menu>
            </div>
        );
    }
    
}

export default withRouter(MenuLayout);
