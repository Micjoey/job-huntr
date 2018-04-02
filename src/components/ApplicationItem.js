import React from 'react';

const statuses = [
    "unscheduled",
    "phone screen",
    "project",
    "onsite",
    "offer",
    "hired",
    "tech-call",
    "coffee meeting"
];

class ApplicationItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.application.status || " "
        }
    }

    handleChange(event) {
        console.log(this);
        let self = this;
        this.props.updateStatus({id: self.props.application._id, status: event.target.value});
        this.setState({status: event.target.value});
    }

    componentWillMount() {
        this.setState({status: this.props.application.status});
    }

    render() {
        return (<div>
            <li id={this.props.application._id}>
                {this.props.application.company_name}, {this.props.application.role}, {this.props.application.application_date},
                <select value={this.state.status} onChange={this.handleChange.bind(this)}>
                    {statuses.map((status) => <option value={status}>{status}</option>)}
                </select>
                {this.props.application.status}
            </li>
        </div>);
    }
}

export default ApplicationItem;
