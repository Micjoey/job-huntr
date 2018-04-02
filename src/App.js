import React, {Component} from 'react';
import './App.css';
import ApplicationList from './components/ApplicationList';
import AddApplication from './components/AddApplication';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

const apps = [
    {
        company_name: "Fountain",
        role: "Frontend Engineer (React)",
        application_date: "March 26, 2018",
        status: "tech-call",
        contact: "jaci@fountain.com",
        link: "fountain.com"
    }, {
        company_name: "Resource",
        role: "Fullstack Engineer",
        application_date: "March 22, 2018",
        status: "coffee meeting",
        contact: "troy@resource.io",
        link: "resource.io"
    }
];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: apps
        }
    }

    componentWillMount() {
        let self = this;
        axios.get('http://localhost:3000/applications').then(function(result) {
            let stringified = JSON.stringify(result);
            console.log(JSON.parse(stringified).data);
            self.setState({
                applications: JSON.parse(stringified).data
            });
        }).catch(function(error) {
            console.log(error);
        });

    }

    addApp(app) {
        let self = this;
        const state = this.state.applications;

        axios.post('http://localhost:3000/add', {
            company_name: app.company_name,
            role: app.role,
            application_date: app.application_date,
            status: app.status
        }).then(function(result) {
            self.setState({
                applications: [...state, result.data]
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

    updateStatus(item) {
        axios.post('http://localhost:3000/update', {
            id: item.id,
            status: item.status
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {

        return (<div className="App">
            <Login/>
            <Register/>
            <AddApplication addApplication={this.addApp.bind(this)}/>
            <ApplicationList updateStatus={this.updateStatus.bind(this)} applications={this.state.applications}/>
        </div>);
    }
}

export default App;
