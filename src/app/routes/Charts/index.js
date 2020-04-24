import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class Charts extends React.Component {

    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.chartsPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.chartsPage.description"/></h1>
                </div>
            </div>
        );
    }
}

export default Charts;