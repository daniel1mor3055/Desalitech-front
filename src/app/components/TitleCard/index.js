import React from 'react';
import {Card, CardBody, CardSubtitle} from 'reactstrap';
import PropTypes from "prop-types";
import Gauge from "../../routes/Dashboard/Gauge";

const TitleCard = ({tagName, tagValue, tagUnits}) =>
    (
        <Card className="shadow border-0">
            <CardBody>
                <h3 className="card-title">{tagName}</h3>
                <CardSubtitle>{`${tagValue} ${tagUnits}`}</CardSubtitle>
            </CardBody>
        </Card>
    );


TitleCard.propTypes = {
    tagName: PropTypes.string.isRequired,
    tagUnits: PropTypes.number.isRequired,
    tagValue: PropTypes.string.isRequired,
};

export default TitleCard;