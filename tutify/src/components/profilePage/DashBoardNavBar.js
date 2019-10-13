import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import * as NavBarStyles from './DashBoardNavBar-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavDrawer } from "./NavDrawer";

export class NavBar extends Component {
    
        constructor(props) {
            super(props);
            this.state = {
              drawerOpened: false
            };
          }
          toggleDrawer = booleanValue => () => {
            this.setState({
              drawerOpened: booleanValue
            });
          };
        
        
    componentDidMount() {
        this.checkSession();
      }
      checkSession = () => {
        fetch('http://localhost:3001/api/checkSession',{
                      method: 'GET',
                      credentials: 'include'
        })          
          .then(response => response.json())
          .then(res => {
            console.log(res);
            if(res.isLoggedIn){
                this.setState({Toggle: true});
            }
            else{
                this.setState({Toggle: false});
            }
          })
          .catch(err => console.log(err));
        };
    
   render(){
    const { classes } = this.props;
    const { open } = this.state;
    return (
      
    <div className={classes.root}>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style = {{background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={this.toggleDrawer(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <SchoolIcon />
          <Box m={1} /> 
            <Typography variant="h6" color="inherit" >
              Tutify
            </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          </Typography>
       
        </Toolbar>
      </AppBar>
      <NavDrawer
            drawerOpened={this.state.drawerOpened}
            toggleDrawer={this.toggleDrawer}
          />
    </div>
    
    );
   }
}
export default withStyles(NavBarStyles.styles, { withTheme: true })(NavBar);