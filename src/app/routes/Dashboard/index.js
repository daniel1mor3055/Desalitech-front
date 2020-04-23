import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

class Dashboard extends React.Component {

  render() {
      console.log("GOT HERE")
    return (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.dashboardPage"/>}/>
        <div className="d-flex justify-content-center">
          <h1><IntlMessages id="pages.dashboardPage.description"/></h1>
        </div>

      </div>
    );
  }
}

export default Dashboard;