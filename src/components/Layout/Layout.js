import React from 'react';
import Aux from '../../HOC/Auxilary';
import classes from './Layout.css';

const Layout = (props) => {
    return(
        <Aux>
            <div>Toolbar, Sidedrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

export default Layout;