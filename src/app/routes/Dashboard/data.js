import React from 'react';

export const growthData = [
    {name: 'Page A', tag2: 1200},
    {name: 'Page B', tag2: 600},
    {name: 'Page C', tag2: 1200},
    {name: 'Page D', tag2: 600},
    {name: 'Page D', tag2: 900}

];

export const trafficData = [
    {name: 'Page A', tag2: 200},
    {name: 'Page B', tag2: 900},
    {name: 'Page C', tag2: 600},
    {name: 'Page D', tag2: 1600},
    {name: 'Page D', tag2: 900}
];

export const dataMetrics = [
    {
        title: '2,380',
        subTitle: 'Orders this year',
        imageIcon: require('assets/images/dashboard/shopping-bag-icon.png')
    }, {
        title: '29,380',
        subTitle: 'Revenue this year',
        imageIcon: require('assets/images/dashboard/rich-icon.png')
    }, {
        title: '2,870',
        subTitle: 'Visits this year',
        imageIcon: require('assets/images/dashboard/mouse-icon.png')
    }, {
        title: '8,380',
        subTitle: 'Queries this year',
        imageIcon: require('assets/images/dashboard/contact-icon.png')
    }
];

export const commerceStatus = [
    {
        title: '2,380',
        colorTitle: 'white',
        subTitle: 'Orders this year',
        colorSubTitle: 'white',
        color: 'primary',
        imageIcon: require('assets/images/dashboard/shopping-bag-icon-sm.png')
    }, {
        title: '29,380',
        colorTitle: 'white',
        subTitle: 'Revenue this year',
        colorSubTitle: 'white',
        color: 'secondary',
        imageIcon: require('assets/images/dashboard/rich-icon-sm.png')
    }, {
        title: '2,870',
        colorTitle: 'indigo',
        subTitle: 'Visits this year',
        colorSubTitle: 'grey',
        color: '',
        imageIcon: require('assets/images/dashboard/mouse-icon-sm.png')
    }
];

export const revenueData = [
    {name: 'Page A', tag2: 850},
    {name: 'Page B', tag2: 300},
    {name: 'Page C', tag2: 1100},
    {name: 'Page D', tag2: 600},
];

export const incrementData = [
    {name: 'Page A', tag2: 200},
    {name: 'Page B', tag2: 1200},
    {name: 'Page C', tag2: 600},
    {name: 'Page D', tag2: 1600},
    {name: 'Page D', tag2: 1000},
    {name: 'Page H', tag2: 2260},
    {name: 'Page K', tag2: 800},
];

export const siteVisit = [
    {name: '1', tag1: 0, tag2: 0},
    {name: '2', tag1: 0, tag2: 1},
    {name: '3', tag1: 5, tag2: 2},
    {name: '4', tag1: 10, tag2: 0},
    {name: '5', tag1: 4, tag2: 1},
    {name: '6', tag1: 16, tag2: 3},
    {name: '7', tag1: 5, tag2: 1},
    {name: '8', tag1: 11, tag2: 5},
    {name: '9', tag1: 6, tag2: 2},
    {name: '10', tag1: 11, tag2: 3},
    {name: '11', tag1: 30, tag2: 2},
    {name: '12', tag1: 10, tag2: 1},
    {name: '13', tag1: 13, tag2: 0},
    {name: '14', tag1: 4, tag2: 2},
    {name: '15', tag1: 3, tag2: 8},
    {name: '16', tag1: 1, tag2: 0},
    {name: '17', tag1: 0, tag2: 0},
];

export const lineData = [
    {name: 'Page A', tag2: 200},
    {name: 'Page B', tag2: 1100},
    {name: 'Page C', tag2: 800},
    {name: 'Page D', tag2: 1700},
    {name: 'Page D', tag2: 600},
    {name: 'Page D', tag2: 1800},
    {name: 'Page D', tag2: 600},
];
export const recentActivity = [
    {
        id: 1,
        day: 'Today',
        tasks: [
            {
                id: 1,
                name: 'Mila Alba',
                title: [<span className="jr-link">Mila Alba</span>, ' left a 5 star review on ',
                    <span className="jr-link">Albama’s House</span>],
                avatar: 'https://via.placeholder.com/150x150',
                imageList: [],
            },
            {
                id: 2,
                name: 'Bob Builder',
                title: ['Callback request from ', <span className="jr-link">Bob Builder</span>, ' for the property ',
                    <span className="jr-link">Dimitri House</span>],
                avatar: 'https://via.placeholder.com/150x150',
                imageList: [],
            },
            {
                id: 3,
                name: 'Tom Moody',
                title: ['Congratulations to ', <span className="jr-link">Tom Moody</span>,
                    ' for joining 10+ club '],
                avatar: 'https://via.placeholder.com/150x150',
                imageList: [],
            },
            {
                id: 4,
                name: 'Norman Dolphi',
                title: ['Norman Dolphi is looking for a house in New Jersy, USA'],
                avatar: '',
                imageList: [],
            }
        ]
    },
    {
        id: 2,
        day: 'Yesterday',
        tasks: [
            {
                id: 5,
                name: 'Kily Johns',
                title: ['Agent ', <span className="jr-link">Kily Johns</span>, ' has added 7 new photos to the property ',
                    <span className="jr-link">Albama’s House</span>],
                avatar: '',
                imageList: ['https://via.placeholder.com/150x150', 'https://via.placeholder.com/150x150', 'https://via.placeholder.com/150x150'],
            },
            {
                id: 6,
                name: 'Tom Moody',
                title: ['Welcome to a new agent ', <span className="jr-link">Tom Moody in the Company</span>],
                avatar: 'https://via.placeholder.com/150x150',
                imageList: [],
            },
            {
                id: 7,
                name: 'Oliver Shorter',
                title: [<span className="jr-link">Oliver Shorter</span>, ' is looking for an office space in ',
                    <span className="jr-link">Colorado, USA</span>],
                avatar: 'https://via.placeholder.com/150x150',
                imageList: [],
            }
        ]
    }];
