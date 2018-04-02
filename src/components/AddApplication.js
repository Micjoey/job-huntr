import React from 'react';
const statuses = ["unscheduled", "phone screen", "project", "onsite", "offer", "hired", "tech-call", "coffee meeting"];

class AddApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            company_name: '',
            status: '',
            application_date: new Date(),
            role: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        this.props.addApplication(self.state);
    }

    handleCompanyChange(event) {
        this.setState({
            company_name: event.target.value
        });
    }

    handleRoleChange(event) {
        this.setState({
            role: event.target.value
        });
    }

    handleDateChange(event) {
        this.setState({
            application_date: new Date(event.target.value)
        });
    }

    handleStatusChange(event) {
        this.setState({
            status: event.target.value
        });
    }

    render() {
    return (<div>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="form-control-label">Company Name</label>
            <input type="text" name="company_name" onChange={this.handleCompanyChange.bind(this)}/>
            <label className="form-control-label">Role</label>
            <input type="text" name="role" onChange={this.handleRoleChange.bind(this)}/>
            <label className="form-control-label">Application Date</label>
            <input type="text" name="application_date" onChange={this.handleDateChange.bind(this)}/>
            <label className="form-control-label">Status</label>
            <select value={this.state.status} onChange={this.handleStatusChange.bind(this)}>
                {statuses.map((status) => <option value={status}>{status}</option>)}
            </select>
            <button type="submit">Add</button>
        </form>
        Company: {this.state.company_name}, Role: {this.state.role}, Application Date: {this.state.application_date.toUTCString()}, Status: {this.state.status}
    </div>);
}

}

export default AddApplication;
