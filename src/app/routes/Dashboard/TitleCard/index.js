import React from 'react';
import {Card, CardBody, CardSubtitle, CardText} from 'reactstrap';
import Button from '@material-ui/core/Button';

const TitleCard = (props) => {
    return (
        <Card className="shadow border-0" style={{textAlign: 'center'}}>
            <CardBody>
                <h3 className="card-title">{props.tagName}</h3>
                <CardSubtitle>{props.tagValue}</CardSubtitle>
                <CardText>
                    {props.tagDescription}
                </CardText>
            </CardBody>

            <div className="card-mt-footer" style={{textAlign: 'center'}}>
                <Button className="btn btn-sm" color="primary">Settings</Button>
            </div>
        </Card>
    );
};
export default TitleCard;