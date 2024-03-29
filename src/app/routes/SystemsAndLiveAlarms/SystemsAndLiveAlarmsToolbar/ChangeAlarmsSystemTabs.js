import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {extractCurrentTabFromURL} from "api/utils";
import {withRouter} from 'react-router-dom';

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


class ChangeAlarmsSystemTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: extractCurrentTabFromURL() === 'active_alarms' ? 1 : 0
        };
    }


    handleChange = (event, value) => {
        this.setState({value});
        const currentTab = value ? 'active_alarms' : 'system_select';
        window.history.pushState({currentTab: currentTab}, "", `system-select-active-alarms?currentTab=${currentTab}`);
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {theme, alarms, systems} = this.props;

        return (
            <div className="w-100">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        scrollButtons="on"
                    >
                        <Tab className="tab" label="System Select"/>
                        <Tab className="tab" label="Active Alarms"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>{systems}</TabContainer>
                    <TabContainer dir={theme.direction}>{alarms}</TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

ChangeAlarmsSystemTabs.propTypes = {
    theme: PropTypes.object.isRequired,
    systems: PropTypes.node.isRequired,
    alarms: PropTypes.node.isRequired,
};

export default withStyles(null, {withTheme: true})(withRouter(ChangeAlarmsSystemTabs));