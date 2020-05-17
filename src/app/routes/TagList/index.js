import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import {fetchTags} from 'store/thunk/tagsList';
import {Auth0Context} from 'Auth0Provider';
import Table from 'app/components/Table';

class TagList extends PureComponent {
    static contextType = Auth0Context;

    componentDidMount() {
        const systemId = "IL_OFFICE_TEST";
        this.props.onFetchTags(systemId);
    }

    render() {
        const {match, tags, fetching, error} = this.props;
        let tagsList = <CircularIndeterminate/>;

        if (!error && !fetching && tags.length !== 0) {
            tagsList =
                <div className="col-12">
                    <div className="jr-card">
                        <div className="jr-card-header mb-3 d-flex">
                            <h3 className="mb-0 mr-auto">Tags List</h3>
                        </div>
                        <Table data={tags}/>
                    </div>
                </div>;
        }

        if (error) {
            tagsList = <p>{"Coudn't fetch tags"}</p>;
        }


        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.tagListPage"/>}/>
                <div className="d-flex justify-content-center">
                    {tagsList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({tags}) => {
    return {
        tags: tags.tags,
        fetching: tags.fetching,
        error: tags.error,
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchTags: (systemId) => dispatch(fetchTags(systemId))};
};

export default connect(mapStateToProps, mapDispatchedToProps)(TagList);