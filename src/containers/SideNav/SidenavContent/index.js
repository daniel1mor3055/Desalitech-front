import React, { Component } from 'react';
import SidenavList from '../SidenavItems';
import SidenavItem from '../SidenavItems/SidenavItem';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import './index.scss';
import StatusIndicator from "app/components/StatusIndicator";


class SidenavContent extends Component {
    activeLi = (pathname) => {
        const activeLi = document.querySelector('a[href="' + pathname + '"]');
        try {
            const activeNav = this.closest(activeLi, 'ul');
            if (activeNav.classList.contains('sub-menu')) {
                this.closest(activeNav, 'li').classList.add('open');
            } else {
                this.closest(activeLi, 'li').classList.add('open');
            }
        } catch (error) {
        }
    };

    componentDidMount() {
        const { history } = this.props;
        const that = this;
        const pathname = `${history.location.pathname}`;

        const menuLi = document.getElementsByClassName('menu');
        for (let i = 0; i < menuLi.length; i++) {
            menuLi[i].onclick = function (event) {

                const parentLiEle = that.closest(this, 'li');
                if (menuLi[i].classList.contains('menu') && parentLiEle !== null) {
                    event.stopPropagation();

                    if (menuLi[i].classList.contains('open')) {
                        menuLi[i].classList.remove('open', 'active');
                    } else {
                        menuLi[i].classList.add('open', 'active');
                    }
                } else {
                    for (let j = 0; j < menuLi.length; j++) {
                        const parentLi = that.closest(this, 'li');
                        if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
                            menuLi[j].classList.remove('open');
                        } else {
                            if (menuLi[j].classList.contains('open')) {
                                menuLi[j].classList.remove('open');
                            } else {
                                menuLi[j].classList.add('open');
                            }
                        }
                    }
                }
            };
        }

        this.activeLi(pathname);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { history } = nextProps;
        const pathname = `${history.location.pathname}`;

        this.activeLi(pathname);
    }

    closest(el, selector) {
        try {
            let matchesFn;
            ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                if (typeof document.body[fn] === 'function') {
                    matchesFn = fn;
                    return true;
                }
                return false;
            });

            let parent;

            while (el) {
                parent = el.parentElement;
                if (parent && parent[matchesFn](selector)) {
                    return parent;
                }
                el = parent;
            }
        } catch (e) {

        }

        return null;
    }

    prepareSystemsStatus() {
        const { systemsStatus } = this.props;

        if (systemsStatus.length) {
            return systemsStatus[0].status;
        }
    }

    render() {
        const { location } = this.props;
        const queryParams = new URLSearchParams(location.search);
        const encodedSysId = queryParams.get('sysId');
        const systemStatus = this.prepareSystemsStatus();
        return (
            <div className='SidenavContent-content'>
                <SidenavList>
                    <SidenavItem relativePath={`dashboard?sysId=${encodedSysId}`} id={"Dashboard"}
                                 icon={"zmdi-time-countdown"}/>
                    <SidenavItem relativePath={`charts?sysId=${encodedSysId}`} id={"Charts"}
                                 icon={"zmdi-chart"}/>
                    <SidenavItem relativePath={`alarm-list?sysId=${encodedSysId}`} id={"Alarms History"}
                                 icon={"zmdi-notifications-active"}/>
                    <SidenavItem relativePath={`tag-list?sysId=${encodedSysId}`} id={"Tags List"}
                                 icon={"zmdi-tag"}/>
                </SidenavList>
                <StatusIndicator systemStatus={systemStatus}/>
            </div>
        );
    }
}

const mapStateToProps = ({ poll }) => {
    const { systemsStatus } = poll;
    return { systemsStatus };
};

export default withRouter(connect(mapStateToProps)(SidenavContent));
