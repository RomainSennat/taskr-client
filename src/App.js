import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header } from 'semantic-ui-react';
import './App.css';
import Router from './components/Router';
import MenuLayout from './containers/MenuLayout';

export default class App extends React.PureComponent {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Container className='layout'>
                <Header as='h1' textAlign='center'>TaskR</Header>
                <BrowserRouter>
                    <MenuLayout />
                    <Router />
                </BrowserRouter>
            </Container>
        );
    }
    
}
