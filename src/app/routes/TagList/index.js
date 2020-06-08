import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import ContainerHeader from 'app/components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';
import {fetchTags, postTag} from 'store/thunk/tagsList';
import SearchBox from 'app/components/SearchBox';
import DataTable from 'app/components/DataTable';
import EditTagForm from "./EditTagForm";
import IconButton from "@material-ui/core/IconButton";
import './index.scss';

class TagList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tagId: null,
            tagName: null,
            description: null,
            units: null,
            openEditModal: false,
            tagIdSearchText: '',
            tagNameSearchText: '',
            tagDescriptionSearchText: '',
        };
    }

    componentDidMount() {
        this.props.onFetchTags();
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
        this.props.onPostTag(values);
    };

    getSearchOptions = () => {
        return {
            'ID': 'tagIdSearchText',
            'NAME': 'tagNameSearchText',
            'DESCRIPTION': 'tagDescriptionSearchText',
        };
    };

    updateSearchText(event, id) {
        const stateSearchOptions = this.getSearchOptions();

        this.setState({[stateSearchOptions[id]]: event.target.value});
    }

    handleSearchClear(event, id) {
        event.preventDefault();
        const stateSearchOptions = this.getSearchOptions();

        this.setState({[stateSearchOptions[id]]: ''});
    }


    getFilterData(tags) {
        const {tagIdSearchText, tagNameSearchText, tagDescriptionSearchText} = this.state;
        let filteredTags = tags.filter(tag => {
            const {tagId, tagName, description} = tag;
            const tagNameToSearch = tagName === null ? '' : tagName;
            const tagIdToSearch = tagId === null ? '' : tagId;
            const tagDescriptionToSearch = description === null ? '' : description;

            return tagIdToSearch.toLowerCase().includes(tagIdSearchText.toLowerCase()) &&
                tagNameToSearch.toLowerCase().includes(tagNameSearchText.toLowerCase()) &&
                tagDescriptionToSearch.toLowerCase().includes(tagDescriptionSearchText.toLowerCase());
        });
        const badSearch = !filteredTags.length;
        return {filteredTags, badSearch};
    }

    render() {
        const {
            openEditModal, tagId, tagName, description, units,
            tagIdSearchText, tagNameSearchText, tagDescriptionSearchText
        } = this.state;
        const {tags, fetching, error} = this.props;
        const columnsIds = ['tagId', 'tagName', 'description', 'units'];
        const columnsLabels = ['Tag ID', 'Tag Name', 'Description', 'Units'];
        const {filteredTags, badSearch} = this.getFilterData(tags);

        const tagList =
            <div className="row animated slideInUpTiny animation-duration-3">
                <div className={'col-12'}>
                    <div className='TagList-searchBoxes row'>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Tag ID"
                                onChange={(event) => this.updateSearchText(event, 'ID')}
                                value={tagIdSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'ID')}/>
                        </div>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Tag Name"
                                onChange={(event) => this.updateSearchText(event, 'NAME')}
                                value={tagNameSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'NAME')}/>
                        </div>
                        <div className='col-2'>
                            <SearchBox
                                showClear={true}
                                styleName="d-none d-lg-block"
                                placeholder="Filter by Description"
                                onChange={(event) => this.updateSearchText(event, 'DESCRIPTION')}
                                value={tagDescriptionSearchText} badSearch={badSearch}
                                handleClear={(event) => this.handleSearchClear(event, 'DESCRIPTION')}/>
                        </div>
                    </div>
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
                </div>
            </div>;

        return (
            <div className="TagList app-wrapper">
                {fetching ?
                    error ? <p>{"Coudn't fetch tags"}</p> : <CircularIndeterminate/>
                    : tagList}

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
        onFetchTags: () => dispatch(fetchTags()),
        onPostTag: (tagData) => dispatch(postTag(tagData))
    };
};

export default connect(mapStateToProps, mapDispatchedToProps)(TagList);