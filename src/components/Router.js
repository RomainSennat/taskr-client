import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

// Lazy loading
const TaskList = lazy(() => import('./TaskList'));
const AddForm = lazy(() => import('./TaskAddForm'));

export default class Router extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Switch>
                <Route exact path='/' component={TaskList} />
                <Route path='/tasks' component={TaskList} />
                <Route path='/add' component={AddForm} />
            </Switch>
        );
    }
    
}
