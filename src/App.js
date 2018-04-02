import React, {Component} from 'react';
import './App.css';
import ApplicationList from './components/ApplicationList';

const applications = [
    {
        company_name: "Fountain",
        role: "Frontend Engineer (React)",
        application_date: new Date("March 26, 2018"),
        status: "tech-call",
        contact: "jaci@fountain.com",
        link: "fountain.com"
    }, {
        company_name: "Resource",
        role: "Fullstack Engineer",
        application_date: new Date("March 22, 2018"),
        status: "coffee meeting",
        contact: "troy@resource.io",
        link: "resource.io"
    }
];

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {


        return (<div className="App">
            <ApplicationList applications={applications}/>
        </div>);
    }
}

export default App;
