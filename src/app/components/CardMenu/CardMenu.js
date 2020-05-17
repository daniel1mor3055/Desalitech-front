import React,{Component} from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import IntlMessages from 'util/IntlMessages';


class CardMenu extends Component {

    render() {
        const options = [
            <IntlMessages id="popup.updateData"/>,
            <IntlMessages id="popup.detailedLog"/>,
            <IntlMessages id="popup.statistics"/>,
            <IntlMessages id="popup.clearData"/>
        ];
        const {menuState, anchorEl, handleRequestClose} = this.props;
        return (
            <Menu id="long-menu"
                  anchorEl={anchorEl}
                  open={menuState}
                  onClose={handleRequestClose}

                  MenuListProps={{
                      style: {
                          width: 150,
                          paddingTop: 0,
                          paddingBottom: 0
                      },
                  }}>
                {options.map(option =>
                    <MenuItem key={option} onClick={handleRequestClose}>
                        {option}
                    </MenuItem>,
                )}
            </Menu>
        );
    }

}

CardMenu.propTypes = {
    menuState: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    handleRequestClose: PropTypes.func.isRequired,
};

export default CardMenu;