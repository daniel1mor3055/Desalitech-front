import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {isIOS, isMobile} from 'react-device-detect';

import Footer from 'components/Footer';
import Tour from 'components/Tour';
import {ABOVE_THE_HEADER, BELOW_THE_HEADER, HORIZONTAL_NAVIGATION,} from 'store/actionTypes';
import TopNav from 'components/TopNav';
import ContainerHeader from 'components/ContainerHeader';
import IntlMessages from 'util/IntlMessages';
import BasicCard from './basicCards/BasicCard';
import Header from 'components/Header';
import {fetchSystems} from 'store/thunk/systemSelect';
import CircularIndeterminate from 'app/components/Progress/CircularIndeterminate';

class App extends PureComponent {

    componentDidMount() {
        this.props.onFetchSystems();
    }

    render() {
        const {match, navigationStyle, horizontalNavPosition, systems, fetching, error} = this.props;
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height');
        } else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height');
        }

        let systemsCards = <CircularIndeterminate/>;

        if (!error && !fetching && systems.length !== 0) {
            systemsCards =
                <div className='d-flex'>
                    {systems.map(system => (
                        <BasicCard
                            key={system.id}
                            image={require('./assets/large_no_background_top.svg')}
                            title={system.id.SystemID}
                            rec={system.id.Recovery + '%'}
                            prod={system.id.Production + ' gpm'}
                            cond={system.id.Conductivity + ' us/cm'}
                            status={system.id.status}
                        />
                    ))}
                </div>;
        }

        return (
            <div className={`app-container collapsible-drawer`}>
                <Tour/>
                <div className="app-main-container">
                    <div
                        className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
                        <TopNav styleName="app-top-header"/>}
                        <Header/>
                        {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
                        <TopNav/>}
                    </div>

                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">
                            <div className="app-wrapper">
                                <ContainerHeader match={match} title={<IntlMessages id="pages.systemSelectPage"/>}/>
                                <div className="d-sm-inline-block">
                                    {systemsCards}
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </main>
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({settings,systems}) => {
    return {
        navigationStyle: settings.navigationStyle,
        horizontalNavPosition: settings.horizontalNavPosition,
        systems: systems.systems,
        fetching: systems.fetching,
        error: systems.error,
    };
};


const mapDispatchedToProps = dispatch => {
    return {onFetchSystems: () => dispatch(fetchSystems())};
};

export default connect(mapStateToProps, mapDispatchedToProps)(App);