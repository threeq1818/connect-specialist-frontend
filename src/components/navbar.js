// components/navbar.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


const NavBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <ToolBar>
                    <Typography variant="h6" className={classes.title}>
                        Specialists And Customers Always Wish To Meet
                    </Typography>

                    <Button color="inherit">Sign Up</Button>
                    <Button color="inherit">Sign In</Button>
                </ToolBar>
            </AppBar>
        </div >
    );
}

export default NavBar;