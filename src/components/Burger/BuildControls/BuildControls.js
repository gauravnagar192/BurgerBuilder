import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <strong>
      <p>Current Price : {props.price.toFixed(2)}</p>
    </strong>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        remove={() => props.ingredientRemove(ctrl.type)}
        label={ctrl.label}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);

export default BuildControls;
