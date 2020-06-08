import React from 'react';
import {Card, CardBody, CardImg, CardSubtitle} from 'reactstrap';
import classnames from 'classnames';

import './BasicCard.scss';
import PropTypes from 'prop-types';


const BasicCard = ({image, title, recovery, production, conductivity,
                       onClick, systemStatusIcon, systemStatusBorder}) => {
    console.log(systemStatusBorder)
    return (
        <div className='BasicCard' onClick={onClick}>
            <Card className="shadow border-0 m-0">
                <CardBody className={'BasicCard-CardBody'}>
                    <div className={classnames('BasicCard-TitleClass', systemStatusBorder)}>
                        <CardImg className='BasicCard-ImgSize' src={image} alt="system"/>
                        <h3>System</h3>
                        <h3>{title}</h3>
                            </div>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/recovery.svg')}
                             alt="system"/>
                        <strong> Recovery:</strong>
                        <span className='BasicCard-TextToTheRight'>{recovery}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/production.svg')}
                             alt="system"/>
                        <strong>Production:</strong>
                        <span className='BasicCard-TextToTheRight'>{production}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/conductivity.svg')}
                             alt="system"/>
                        <strong>Conductivity:</strong>
                        <span className='BasicCard-TextToTheRight'>{conductivity}</span></CardSubtitle>
                    <div className={'d-flex justify-content-end'}>
                        {systemStatusIcon}
                    </div>
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
    onClick: PropTypes.func.isRequired
};
export default BasicCard;