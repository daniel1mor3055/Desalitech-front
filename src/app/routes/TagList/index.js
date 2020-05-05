import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import TagsTable from './TagsTable';
import axios from '../../../axios-firebase';
import CircularIndeterminate from '../../components/Progress/CircularIndeterminate';

class TagList extends React.Component {
    state = {
        tags: null,
        error: null,
    };

    componentDidMount() {
        axios.get('/tags.json').then(res => {
            const updatatedTags = res.data.filter(tagElem => tagElem).map((tagElem, index) => {
                    return {
                        id: index,
                        tagId: tagElem.tag_id,
                        tagName: tagElem.tag_name,
                        tagValue: tagElem.tag_value,
                    };
                }
            );
            return this.setState({tags: updatatedTags});
        }).catch(error => {
            console.log(error);
            return this.setState({error: error});
        });
    }

    render() {
        let tagsTable = this.state.error ? <p>{"Something Went Wrong - "+this.state.error.message}</p> : <CircularIndeterminate/>;

        if (this.state.tags) {
            tagsTable = (
                <div className="col-12">
                    <div className="jr-card">
                        <div className="jr-card-header mb-3 d-flex">
                            <h3 className="mb-0 mr-auto">Tags List</h3>
                        </div>
                        <TagsTable data={this.state.tags}/>
                    </div>
                </div>);
        }

        return (
            <div className="app-wrapper">
                <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.tagListPage"/>}/>
                <div className="d-flex justify-content-center">
                    {tagsTable}
                </div>

            </div>
        );
    }
}

export default TagList;