import React, { useState } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../HOC/Auxilary';

const BurgerBuilder = () => {

    const [ingredients,setIngredients] = useState({
       salad: 0,
       bacon: 0,
       cheese: 0,
       meat: 0 
    });

    return (
        <Aux>
            <Burger ingredients={ingredients}/>
            <div>Build Controls</div>
        </Aux>
    )
}

export default BurgerBuilder;