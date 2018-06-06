import React from 'react';
import PropTypes from 'prop-types';

const DisplayView = (props) => (
    <div className="mt-md-2" style={{position: 'relative'}}>
        <div className="pr-2 h4" style={{position: 'absolute', top: 0, right: 0}}>
            {props.expression}
        </div>
        <div className="display text-right pr-2 h3 d-sm-block pt-5">
            {props.value}
        </div>
    </div>
);

DisplayView.defaultProps = {
    expression: '',
    value: '0',
};

DisplayView.propTypes = {
    expression: PropTypes.string,
    value: PropTypes.string,
};

export default DisplayView;
