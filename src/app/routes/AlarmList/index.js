import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import axios from "../../../axios-firebase";
import CircularIndeterminate from "../../components/Progress/CircularIndeterminate";
import AlarmsTable from './AlarmsTable';
import IconButton from "@material-ui/core/IconButton";
import CardMenu from "./CardMenu/CardMenu";

class AlarmList extends React.Component {
    state = {
        alarms: null,
        error: null,
        subMenuState: false,
        anchorEl: undefined,
    };

    onOptionMenuSelect = (event) => {
        this.setState({subMenuState: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({subMenuState: false});
    };

    componentDidMount() {
        axios.get('/alarms.json').then(res => {
            const updatatedAlarms = res.data.filter(tagElem => tagElem).map((tagElem, index) => {
                    return {
                        id: index,
                        alarmId: tagElem.alarm_id,
                        alarmDescription: tagElem.alarm_description,
                        alarmDate: tagElem.alarm_date,
                    };
                }
            );
            return this.setState({alarms: updatatedAlarms});
        }).catch(error => {
            console.log(error);
            return this.setState({error: error});
        });
    }

    render() {
        const { match } = this.props;
        let alarmsTable = this.state.error ? <p>{"Something Went Wrong - " + this.state.error.message}</p> :
            <CircularIndeterminate/>;

        if (this.state.alarms) {
            alarmsTable = (
                <div className="col-12">
                    <div className="jr-card">
                        <div className="jr-card-header mb-3 d-flex">
                            <h3 className="mb-0 mr-auto">Alarms List</h3>
                            <IconButton className="icon-btn" onClick={this.onOptionMenuSelect}>
                                <i className="zmdi zmdi-chevron-down"/>
                            </IconButton>
                        </div>
                        <AlarmsTable data={this.state.alarms}/>
                    </div>
                </div>);
        }

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.alarmListPage"/>}/>
                <div className="d-flex justify-content-center">
                    {alarmsTable}
                    <CardMenu menuState={this.state.subMenuState} anchorEl={this.state.anchorEl}
                              handleRequestClose={this.handleRequestClose.bind(this)}/>

                </div>
            </div>
        );
    }
}

export default AlarmList;