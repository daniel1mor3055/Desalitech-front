import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class AlarmList extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.alarmListPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.alarmListPage.description"/></h1>
                </div>

            </div>
        );
    }
}

export default AlarmList;