import React, { useContext } from 'react';
import classes from '../../../index.css';
import Aux from '../../../HOC/Auxilary';
import withClass from '../../../HOC/WithClass';
import PropType from 'prop-types';
import AuthContext from "../../../context/auth-context";

function Person(props) {
  // this is another way for using context api 
  const authContext = useContext(AuthContext);
  return (
      <Aux>
          {authContext.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
        <p onClick={props.click}>
          I'm {props.name} and I am {props.age} years old
        </p>
        <p>{props.children}</p>
      </Aux>
  );
}

// for checking developer should send correct type of props to component
// set only current component props in it
Person.propTypes = {
  click : PropType.func,
  name : PropType.string,
  age : PropType.number
}

export default withClass(Person,classes.Person);