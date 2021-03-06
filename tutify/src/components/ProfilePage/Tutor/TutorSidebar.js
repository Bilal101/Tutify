import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreateIcon from '@material-ui/icons/Create';
import ClassIcon from '@material-ui/icons/Class';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import StarsIcon from '@material-ui/icons/Stars';
import AssessmentIcon from '@material-ui/icons/Assessment';

export class TutorSidebar extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    fetch('/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        localStorage.clear();
      })
      .catch(err => {
        console.error(err)
        localStorage.clear();
      });
  };


  render() {
    return (
      <div>
        <Divider />
        <List>
          <div>
            <ListItem button component="a" href="/profile">
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>

            <ListItem button component="a" href="/documents">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>

            <ListItem button component="a" href="/courses">
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="My Courses" />
            </ListItem>

            <ListItem button component="a" href="/chooseClassAndQuiz">
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Quiz" />
            </ListItem>           

            <ListItem button component="a" href="/grades">
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Grades" />
            </ListItem>

            <ListItem button component="a" href="/videos">
              <ListItemIcon>
                <VideoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItem>

            <ListItem button component="a" href="/announcements">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="Announcements" />
            </ListItem>

            <ListItem button component="a" href="/resources">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Useful Resources" />
            </ListItem>

            <ListItem button component="a" href="/students">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="My Students" />
            </ListItem>

            <ListItem button component="a" href="/" onClick={this.handleChange} >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        </List>

        <Divider />


      </div>
    );

  }
}

export default TutorSidebar;