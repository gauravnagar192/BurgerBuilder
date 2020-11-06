import React from 'react';
import Aux from '../../../HOC/Auxilary/Auxilary';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const SideDrawer = (props) => {
    let attachedclasses = [classes.SideDrawer , classes.Close];
    if(props.open) {
        attachedclasses = [classes.SideDrawer , classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.close} />
        <div className={attachedclasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    )
}

export default SideDrawer;