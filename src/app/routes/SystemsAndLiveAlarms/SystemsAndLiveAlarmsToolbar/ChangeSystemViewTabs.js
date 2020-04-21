import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TocIcon from '@material-ui/icons/Toc';
import AppsIcon from '@material-ui/icons/Apps';

function TabContainer({children, dir}) {
    return (
        <div dir={dir} style={{padding: 8 * 3}}>
            {children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

class ChangeSystemViewTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };
    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {theme, cardsView, tableView} = this.props;

        return (
            <div className="w-100">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="fullWidth"
                        scrollButtons="on"
                    >
                        <Tab className="tab" icon={<AppsIcon/>} label="Gallery View"/>
                        <Tab className="tab" icon={<TocIcon/>} label="Table View"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>{cardsView}</TabContainer>
                    <TabContainer dir={theme.direction}>{tableView}</TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

ChangeSystemViewTabs.propTypes = {
    theme: PropTypes.object.isRequired,
    cardsView: PropTypes.node.isRequired,
    tableView: PropTypes.node.isRequired,
};

export default withStyles(null, {withTheme: true})(ChangeSystemViewTabs);