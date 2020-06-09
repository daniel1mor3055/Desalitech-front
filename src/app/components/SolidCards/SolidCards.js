import React from 'react';
import {Card, CardBody, CardSubtitle} from 'reactstrap';
import PropTypes from "prop-types";

const SolidCard = ({tagName, tagValue, tagUnits, colorIndicator}) => {
    const cardStyle = colorIndicator ? "bg-success text-white" : "bg-warning text-white";
    return (
        <Card className={`shadow border-0 ${cardStyle}`}>
            <CardBody>
                <h3 className="card-title">{tagName}</h3>
                <CardSubtitle className="text-white">{`${tagValue} ${tagUnits}`}</CardSubtitle>
            </CardBody>
        </Card>

    );
};

SolidCard.propTypes = {
    tagName: PropTypes.string,
    tagUnits: PropTypes.string,
    tagValue: PropTypes.number,
    colorIndicator: PropTypes.number.isRequired,
};

export default SolidCard;