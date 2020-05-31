import React, {Component} from 'react';
import {connect} from 'react-redux';

import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import {fetchTags, postTag} from 'store/thunk/tagsList';
import CardBox from 'components/CardBox';
import SearchBox from 'components/SearchBox';
import DataTable from 'app/components/DataTable';
import EditTagForm from "./EditTagForm";
import IconButton from "@material-ui/core/IconButton";

class TagList extends Component {
    state = {
        tagId: null,
        tagName: null,
        description: null,
        units: null,
        openEditModal: false,
        tagIdSearchText: '',
        tagNameSearchText: '',
        tagDescriptionSearchText: '',
    };

    componentDidMount() {
        const {location} = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'));
        this.props.onFetchTags(sysId);
    }

    handleEditClick = (event, tagObject) => {
        event.preventDefault();
        this.setState({
            openEditModal: true,
            ...tagObject,
        });
    };

    handleClose = () => {
        this.setState({openEditModal: false});
    };

    handleSubmit = (values) => {
        const {location} = this.props;
        const queryParams = new URLSearchParams(location.search);
        const sysId = decodeURIComponent(queryParams.get('sysId'));
        this.props.onPostTag(sysId, values);
    };

    updateSearchText(event, fieldToSearch) {
        switch (fieldToSearch) {
            case 'ID': {
                this.setState({
                    tagIdSearchText: event.target.value,
                });
                return;
            }
            case 'NAME': {
                this.setState({
                    tagNameSearchText: event.target.value,
                });
                return;
            }
            case 'DESCRIPTION': {
                this.setState({
                    tagDescriptionSearchText: event.target.value,
                });
                return;
            }
        }
    }

    getFilterData(tags) {
        let filteredTags = tags.filter(tag => {
            let {tagId, tagName, description} = tag;
            if (tagName == null) {
                tagName = '';
            }
            if (tagId == null) {
                tagId = '';
            }
            if (description == null) {
                description = '';
            }
            return tagId.toLowerCase().includes(this.state.tagIdSearchText.toLowerCase()) &&
                tagName.toLowerCase().includes(this.state.tagNameSearchText.toLowerCase()) &&
                description.toLowerCase().includes(this.state.tagDescriptionSearchText.toLowerCase())
        });
        const badSearch = !filteredTags.length;
        return {filteredTags, badSearch};
    }

    render() {
        const {openEditModal, tagId, tagName, description, units,
            tagIdSearchText, tagNameSearchText, tagDescriptionSearchText} = this.state;
        const {match, tags, fetching, error} = this.props;
        const columnsIds = ['tagId', 'tagName', 'description', 'units'];
        const columnsLabels = ['Tag ID', 'Tag Name', 'Description', 'Units'];
        const {filteredTags, badSearch} = this.getFilterData(tags);

        const tagsList =
            <div className="row animated slideInUpTiny animation-duration-3">
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by Tag ID"
                           onChange={(event) => this.updateSearchText(event, 'ID')}
                           value={tagIdSearchText} badSearch={badSearch}/>
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by Tag Name"
                           onChange={(event) => this.updateSearchText(event, 'NAME')}
                           value={tagNameSearchText} badSearch={badSearch}/>
                <SearchBox styleName="d-none d-lg-block"
                           placeholder="Filter by Description"
                           onChange={(event) => this.updateSearchText(event, 'DESCRIPTION')}
                           value={tagDescriptionSearchText} badSearch={badSearch}/>
                <CardBox styleName="col-12" cardStyle=" p-0">
                    <DataTable data={filteredTags}
                               columnsIds={columnsIds}
                               columnsLabels={columnsLabels}
                               initialOrderBy={'tagId'}
                               cellIdentifier={'tagId'}
                               actions={[{
                                   id: 'edit',
                                   label: 'Edit',
                                   cell: (dataObject) => (
                                       <IconButton className="icon-btn text-light p-1"
                                                   onClick={(event) => this.handleEditClick(event, dataObject)}>
                                           <i className="zmdi zmdi-edit text-blue"/>
                                       </IconButton>),
                               }]}
                               handleEditClick={this.handleEditClick}/>
                </CardBox>
                {openEditModal ?
                    <EditTagForm
                        open={openEditModal}
                        handleClose={this.handleClose}
                        handleSubmit={this.handleSubmit}
                        tagId={tagId}
                        tagName={tagName}
                        description={description}
                        units={units}/>
                    : null}
            </div>;

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.tagListPage"/>}/>
                {fetching ?
                    error ? <p>{"Coudn't fetch tags"}</p> : <CircularIndeterminate/>
                    : tagsList}
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
    return {
        onFetchTags: (systemId) => dispatch(fetchTags(systemId)),
        onPostTag: (systemId, tagData) => dispatch(postTag(systemId, tagData))
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(TagList);