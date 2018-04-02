import React from 'react';
import ApplicationItem from './ApplicationItem';

class ApplicationList extends React.Component {
    render() {
        return(
            <div>
                <ul>
                    {this.props.applications.map((item) => <ApplicationItem updateStatus={this.props.updateStatus} key={item._id} application={item}/>)}
                </ul>
            </div>);
    }
}

export default ApplicationList;
