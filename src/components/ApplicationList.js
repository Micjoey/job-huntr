import React from 'react';
import ApplicationItem from './ApplicationItem';

const ApplicationList = ({applications}) => {
        return(
            <div>
                <ul>
                    {applications.map((item) => <ApplicationItem key={item.company_name} application={item}/>)}
                </ul>
            </div>);

}

export default ApplicationList;
