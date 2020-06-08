import React, {Component} from 'react';

import IntlMessages from 'util/IntlMessages';

class Charts extends Component {

    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.chartsPage.description"/></h1>
                </div>
            </div>
        );
    }
}

export default Charts;