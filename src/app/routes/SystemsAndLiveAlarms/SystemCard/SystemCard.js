import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle} from 'reactstrap';
import classnames from 'classnames';

import './SystemCard.scss';
import PropTypes from 'prop-types';


const SystemCard = ({
                       image, title, recovery, production, conductivity,
                       onClick, systemStatusIcon, systemStatusBorder
                   }) => {
    return (
        <div className='SystemCard' onClick={onClick}>
            <Card className="shadow border-0 m-0">
                <CardBody className={'SystemCard-CardBody'}>
                    <div className={classnames('SystemCard-TitleClass', systemStatusBorder)}>
                        <CardImg className='SystemCard-ImgSize' src={image} alt="system"/>
                        <h3>{title}</h3>
                    </div>
                    <CardSubtitle className='SystemCard-CardSubtitleClass'>
                        <img className='SystemCard-IconClass' src={require('../assets/recovery.svg')}
                             alt="system"/>
                        <strong> Recovery:</strong>
                        <span className='SystemCard-TextToTheRight'>{recovery}</span></CardSubtitle>
                    <CardSubtitle className='SystemCard-CardSubtitleClass'>
                        <img className='SystemCard-IconClass' src={require('../assets/production.svg')}
                             alt="system"/>
                        <strong>Production:</strong>
                        <span className='SystemCard-TextToTheRight'>{production}</span></CardSubtitle>
                    <CardSubtitle className='SystemCard-CardSubtitleClass'>
                        <img className='SystemCard-IconClass' src={require('../assets/conductivity.svg')}
                             alt="system"/>
                        <strong>Conductivity:</strong>
                        <span className='SystemCard-TextToTheRight'>{conductivity}</span></CardSubtitle>
                    <div className={'d-flex justify-content-end'}>
                        {systemStatusIcon}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};


SystemCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    recovery: PropTypes.string.isRequired,
    production: PropTypes.string.isRequired,
    conductivity: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
export default SystemCard;