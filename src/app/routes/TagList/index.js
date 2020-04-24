import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class TagList extends React.Component {

    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.tagListPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.tagListPage.description"/></h1>
                </div>
            </div>
        );
    }
}

export default TagList;