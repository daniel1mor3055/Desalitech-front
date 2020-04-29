import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';
import Card from "@material-ui/core/Card";
import CardImg from "reactstrap/es/CardImg";
import CardBody from "reactstrap/es/CardBody";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";
import Button from "@material-ui/core/Button";

class Reports extends React.Component {

    render() {
        const {match} = this.props;
        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={<IntlMessages id="Systems Page"/>}/>
                <div className="d-flex">
                    <Card className="shadow border-0">
                        <CardBody>
                            <h3 className="card-title">AAAAA</h3>
                            <CardSubtitle>asasas</CardSubtitle>
                            <CardText>asas</CardText>
                            <Button variant="raised" className="bg-primary text-white">asasas</Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Reports;