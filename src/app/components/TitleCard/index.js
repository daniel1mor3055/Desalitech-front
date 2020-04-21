import React from 'react';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import PropTypes from "prop-types";

const TitleCard = ({ tagName, tagValue, tagUnits }) =>
    (
        <Card className="shadow border-0">
            <CardBody>
                <h3 className="card-title">{tagName}</h3>
                <CardSubtitle>{`${tagValue} ${tagUnits}`}</CardSubtitle>
            </CardBody>
        </Card>
    );


TitleCard.propTypes = {
    tagName: PropTypes.string,
    tagUnits: PropTypes.string,
    tagValue: PropTypes.number,
};

export default TitleCard;