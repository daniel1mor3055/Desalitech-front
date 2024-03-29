import React, { Component } from 'react';
import Nprogress from 'nprogress';
import ReactPlaceholder from 'react-placeholder';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';

export default function asyncComponent(importComponent) {
    class AsyncFunc extends Component {
        constructor(props) {
            super(props);

            Nprogress.start();

            this.state = {
                component: null
            };
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        async componentDidMount() {
            this.mounted = true;
            const { default: Component } = await importComponent();
            Nprogress.done();
            if (this.mounted) {
                this.setState({
                    component: <Component {...this.props} />
                });
            }
        }

        render() {
            const Component = this.state.component ||
                <div className="loader-view"
                     style={{ height: 'calc(100vh - 200px)' }}>
                </div>;
            return (
                <ReactPlaceholder type="text" rows={7} ready={Component !== null}>
                    {Component}
                </ReactPlaceholder>
            );
        }
    }

    return AsyncFunc;
}
