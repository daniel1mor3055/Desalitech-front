import React, {Component} from 'react';

import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'components/ContainerHeader';

class Reports extends Component {

    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.reportsPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.reportsPage.description"/></h1>
                </div>
            </div>
        );
    }
}

export default Reports;