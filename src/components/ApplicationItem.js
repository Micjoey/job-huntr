import React from 'react';

const ApplicationItem = ({application}) => {
    return (<div>
        <li id={application.company_name}>
            {application.company_name}, {application.role}, {application.application_date.toUTCString()}, {application.status}
        </li>
    </div>);

}

export default ApplicationItem;
