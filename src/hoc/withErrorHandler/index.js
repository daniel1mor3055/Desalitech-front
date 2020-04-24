import React, {Component} from "react";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        };

        componentDidMount() {
            axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axiosInstance.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        render() {
            return (
                this.state.error ? <p> Something Went Wrong </p> : <WrappedComponent {...this.props}/>
            );
        }
    };
};

export default withErrorHandler;