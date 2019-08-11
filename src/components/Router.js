import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TaskList from '../components/TaskList';

export default class Router extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Switch>
                <Route exact path='/' component={TaskList} />
                <Route path='/tasks' component={TaskList} />
            </Switch>
        );
    }
    
}