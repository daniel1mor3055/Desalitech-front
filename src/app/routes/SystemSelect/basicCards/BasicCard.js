import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle } from 'reactstrap';
import classnames from 'classnames';

import './BasicCard.scss';

const BasicCard = ({ image, title, rec, prod, cond, status }) => {
    let statusString = null;
    let statusClass = null;
    let indicatorColor = null;
    if (status === 'online') {
        statusString = 'Online';
        statusClass = 'GreenBorder';
        indicatorColor = 'green';
    }
    if (status === 'offline') {
        statusString = 'Offline';
        statusClass = 'RedBorder';
        indicatorColor = 'red';
    }
    if (status === 'error') {
        statusString = 'Communication Error';
        statusClass = 'AmberBorder';
        indicatorColor = 'amber';
    }
    return (
        <div className='BasicCard'>
            <Card className="shadow border-0" style={{ margin: '20px' }}>
                <CardBody>
                    <div className={classnames('BasicCard-TitleClass', statusClass)}>
                        <CardImg className='BasicCard-ImgSize' src={image} alt="Card image cap" />
                        <h3><strong>
                            System<br />{title}</strong></h3></div>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/recovery.svg')} alt="Card image cap" />
                        <strong> Recovery:</strong>
                        <span className='BasicCard-TextToTheRight'>{rec}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/production.svg')} alt="Card image cap" />
                        <strong>Production:</strong>
                        <span className='BasicCard-TextToTheRight'>{prod}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                        <img className='BasicCard-IconClass' src={require('../assets/conductivity.svg')}
                             alt="Card image cap" />
                        <strong>Conductivity:</strong>
                        <span className='BasicCard-TextToTheRight'>{cond}</span></CardSubtitle>
                    <CardSubtitle className='BasicCard-CardSubtitleClass'>
                    <span className='BasicCard-TextToTheRight'><i
                        className={`zmdi zmdi-circle text-` + indicatorColor + ' ' + 'Indicator'} />
                        {statusString}
                    </span></CardSubtitle>
                </CardBody>
            </Card>
        </div>
    );
};
export default BasicCard;