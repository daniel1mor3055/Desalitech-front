import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle} from 'reactstrap';
import classnames from 'classnames';
import './BasicCard.scss';
import PropTypes from 'prop-types';


const BasicCard = ({image, title, recovery, production, conductivity, systemStatus, onClick}) => {
    let statusString = null;
    let statusClass = null;
    let indicatorColor = null;
    if (systemStatus === 'online') {
        statusString = 'Online';
        statusClass = 'GreenBorder';
        indicatorColor = 'green';
    }
    if (systemStatus === 'offline') {
        statusString = 'Offline';
        statusClass = 'RedBorder';
        indicatorColor = 'red';
    }
    if (systemStatus === 'error') {
        statusString = 'Communication Error';
        statusClass = 'AmberBorder';
        indicatorColor = 'amber';
    }
    return (
        <div className='BasicCard' onClick={onClick}>
            <Card className="shadow border-0" style={{margin: '20px'}}>
                <CardBody>
                    <div className={classnames('BasicCard-TitleClass', statusClass)}>
                        <CardImg className='BasicCard-ImgSize' src={image} alt="Card image cap"/>
                        <h3><strong>
                            System<br/>{title}</strong></h3></div>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/recovery.svg')}
                             alt="Card image cap"/>
                        <strong> Recovery:</strong>
                        <span className='BasicCard-TextToTheRight'>{recovery}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/production.svg')}
                             alt="Card image cap"/>
                        <strong>Production:</strong>
                        <span className='BasicCard-TextToTheRight'>{production}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/conductivity.svg')}
                             alt="Card image cap"/>
                        <strong>Conductivity:</strong>
                        <span className='BasicCard-TextToTheRight'>{conductivity}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                    <span className='BasicCard-TextToTheRight'><i
                        className={`zmdi zmdi-circle text-${indicatorColor} Indicator`}/>
                        {statusString}
                    </span></CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
};


BasicCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    recovery: PropTypes.string.isRequired,
    production: PropTypes.string.isRequired,
    conductivity: PropTypes.string.isRequired,
    systemStatus: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}
export default BasicCard;