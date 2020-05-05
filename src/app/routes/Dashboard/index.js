import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import TitleCard from "./TitleCard";
import MainChart from "./MainChart";
import Speedometer from "./Speedometer";

class Dashboard extends React.Component {
    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="pages.dashboardPage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.dashboardPage.description"/></h1>
                </div>

                <div className="pr-xl-5 pt-xl-2" style={{marginBottom: '10px'}}>
                    <div className="jr-card">
                        <MainChart height={100}/>
                    </div>
                </div>

                <div className="row mb-md-3">
                    <div className="col-lg-3 col-sm-6 col-12">
                        <TitleCard
                            tagName={"Tag Name"}
                            tagValue={"Tag Value"}
                            tagDescription={"Tag Description"}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                        <TitleCard
                            tagName={"Tag Name"}
                            tagValue={"Tag Value"}
                            tagDescription={"Tag Description"}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                        <TitleCard
                            tagName={"Tag Name"}
                            tagValue={"Tag Value"}
                            tagDescription={"Tag Description"}
                        />
                    </div>
                    <div className="col-lg-3 col-sm-6 col-12">
                        <TitleCard
                            tagName={"Tag Name"}
                            tagValue={"Tag Value"}
                            tagDescription={"Tag Description"}
                        />
                    </div>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-6 col-12 order-xl-4">
                    <div className="jr-card">
                        <div className="jr-card-header">
                            <h3 className="card-heading"><IntlMessages id="dashboard.systemStatus"/></h3>
                        </div>
                        <Speedometer value={90}/>
                        <div className="text-center mt-4">
                            <h4 className="mb-1">Can be defined</h4>
                            <p className="card-text">Can be defined</p>
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default Dashboard;