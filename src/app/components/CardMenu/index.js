import React from 'react';
import Menu from '@material-ui/core/Menu';
import PropTypes from 'prop-types';


const CardMenu = ({ menuState, anchorEl, handleRequestClose, children }) => (
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
        {children}
    </Menu>
);


CardMenu.propTypes = {
    menuState: PropTypes.bool.isRequired,
    handleRequestClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    anchorEl: PropTypes.object,
};

export default CardMenu;