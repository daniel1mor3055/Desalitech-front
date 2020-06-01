import React, {Component} from 'react';

import IntlMessages from 'util/IntlMessages';
import ContainerHeader from 'app/components/ContainerHeader';

class Documentation extends Component {

    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.documentationPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.documentationPage.description"/></h1>
                </div>
            </div>
        );
    }
}

export default Documentation;