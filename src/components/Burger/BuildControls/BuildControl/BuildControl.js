import React from 'react';
import BuildControls from '../BuildControls';

const BuildControl = (props) => (
    <div>
        <div>{props.label}</div>
        <button>less</button>
        <button>more</button>
    </div>
);

export default BuildControl;