import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from '../../components/Progress/CircularIndeterminate';
import * as action from "../../../store/actions/tagsList";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Auth0Context} from '../../../Auth0Provider';
import Table from "../AlarmList/AlarmsTable";

class TagList extends React.Component {
    static contextType = Auth0Context;

    componentDidMount() {
        const {getTokenSilently, getIdTokenClaims} = this.context;
        const systemId = "IL_OFFICE_TEST";
        this.props.onFetchTags(getTokenSilently, getIdTokenClaims, systemId);
    }

    render() {
        const {match, tags, fetching, error} = this.props;
        let tagsTable = <CircularIndeterminate/>;

        if (!error && !fetching && tags.length !== 0) {
            tagsTable = <Table data={tags}/>;
        }

        if (error) {
            tagsTable = <p>{"Coudn't fetch tags"}</p>;
        }


        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.tagListPage"/>}/>
                <div className="d-flex justify-content-center">
                    <div className="col-12">
                        <div className="jr-card">
                            <div className="jr-card-header mb-3 d-flex">
                                <h3 className="mb-0 mr-auto">Tags List</h3>
                            </div>
                            <div className="col-12">
                                <div className="jr-card">
                                    <div className="jr-card-header mb-3 d-flex">
                                        <h3 className="mb-0 mr-auto">Tags List</h3>
                                    </div>
                                    {tagsTable}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tags: state.tagsList.tags,
        fetching: state.tagsList.fetching,
        error: state.tagsList.error,
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchTags: (getTokenSilently, getIdTokenClaims, systemId) => dispatch(action.fetchTags(getTokenSilently, getIdTokenClaims, systemId))};
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(TagList));