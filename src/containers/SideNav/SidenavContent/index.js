import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';

import CustomScrollbars from 'util/CustomScrollbars';
import SidenavList from '../SidenavItems';
import SidenavItem from '../SidenavItems/SidenavItem';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {

        const parentLiEle = that.closest(this, 'li');
        if(menuLi[i].classList.contains('menu') && parentLiEle !== null) {
          event.stopPropagation();

          if(menuLi[i].classList.contains('open')) {
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
              if(menuLi[j].classList.contains('open')) {
                menuLi[j].classList.remove('open');
              } else {
                menuLi[j].classList.add('open');
              }
            }
          }
        }
      }
    }

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
  }

  componentWillReceiveProps(nextProps) {

    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;

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

  render() {
    const {location} = this.props
    const queryParams = new URLSearchParams(location.search);
    const sysId = queryParams.get('sysId')
    return (
        <CustomScrollbars className=" scrollbar">
          <SidenavList>
            <SidenavItem relativePath={`dashboard?sysId=${sysId}`} id={"pages.dashboardPage"} icon={"zmdi-time-countdown"}/>
            <SidenavItem relativePath={`charts?sysId=${sysId}`} id={"pages.chartsPage"} icon={"zmdi-chart"}/>
            <SidenavItem relativePath={`alarm-list?sysId=${sysId}`} id={"pages.alarmListPage"} icon={"zmdi-notifications-active"}/>
            <SidenavItem relativePath={`tag-list?sysId=${sysId}`} id={"pages.tagListPage"} icon={"zmdi-tag"}/>
            <SidenavItem relativePath={`reports?sysId=${sysId}`} id={"pages.reportsPage"} icon={"zmdi-file-text"}/>
            <SidenavItem relativePath={`documentation?sysId=${sysId}`} id={"pages.documentationPage"} icon={"zmdi-folder"}/>
          </SidenavList>
        </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
