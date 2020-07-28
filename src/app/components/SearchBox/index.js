import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from "prop-types";
import './index.scss';

const SearchBox = ({ styleName, placeholder, onChange, value, badSearch, handleClear, showClear }) => {
    const textColor = badSearch ? 'red' : 'black';

    return (
        <div className={`SearchBox search-bar right-side-icon bg-transparent ${styleName}`}>
            <div className="form-group">
                <input className="form-control border-0" type="search" placeholder={placeholder} onChange={onChange}
                       value={value} style={{ color: textColor }}/>
                <button className="search-icon"><i className="zmdi zmdi-search zmdi-hc-lg"/></button>
                {showClear &&
                <IconButton onClick={handleClear} className='SearchBox-clearIcon'>
                    <ClearIcon/>
                </IconButton>}
            </div>

        </div>
    );
};

SearchBox.defaultProps = {
    styleName: "",
    value: "",
};


SearchBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    badSearch: PropTypes.bool,
    showClear: PropTypes.bool,
    handleClear: PropTypes.func,
};

export default SearchBox;

