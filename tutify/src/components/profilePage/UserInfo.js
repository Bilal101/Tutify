import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import CourseSelection from '../profilePage/CourseSelection';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      education_level: "",
      subjects: [],
      students : "",
      data : [],
      courses: []
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
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({
            Toggle: true, first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
            email: res.email, education_level: res.userInfo.education_level, school: res.userInfo.school,
            program_of_study: res.userInfo.program_of_study, subject: res.tutor.subjects
          });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };
  handleChange(event) {
    fetch('http://localhost:3001/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ Toggle: false });
      })
      .catch(err => console.log(err));
    //this.setState({Toggle: false});

  };

  handleChangeValue = e => this.setState({value: e.target.value});
  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({
            Toggle: true, _id : res.userInfo._id, first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
            email: res.email, education_level: res.userInfo.education_level, school: res.userInfo.school,
            program_of_study: res.userInfo.program_of_study, students: res.userInfo.students, subjects: res.userInfo.subjects
          });
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };


  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getUser')
    // get tutor
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  update = async (value) => {     
    await this.setState({
      courses: value
    });
    console.log("POOTIS: "+this.state.courses);
 
 }
 
  updateDB = () => {
  // Will eventuallu implement it.
  console.log("HEY LISTEN: "+this.state.courses);
  //console.log(this.state.counter);
  console.log(this.state.data);
  console.log(this.state.first_name);
  console.log(this.state._id);
  // will eventually
  console.log(this.state.students);
  console.log(this.state.subjects);
  // ^^ tutors tho
  // for now, do the for loop, eventually do the logged in user. Now hardcoded for Pooja

  axios.post('http://localhost:3001/api/updateTutor', {
    _id: "5dae5f8b1c9d44000071cbc2",
    subjects : "d"                                                                                        //classes_tutored : classes_tutored,
    //type_tutoring : type_tutoring
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  };
  render() {
    const { classes } = this.props;


    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <Title> User Info</Title>
          <Typography component="p" variant="h6">
            {this.state.first_name} {this.state.last_name}
          </Typography>
          <Typography component="p" variant="h7">
            Email : {this.state.email}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            Program of Study: {this.state.program_of_study}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            Education Level: {this.state.education_level}
          </Typography>
          <Typography color="textSecondary" className={classes.InfoContext}>
            School: {this.state.school}
          </Typography>

          <div>
          <Grid item xs={6}>
            <CourseSelection
              updateCourses={this.update}
             />
          </Grid>

        <Button
          type="button"
          fullWidth
          variant="contained"
          className="submit"
          onClick={() => { this.updateDB(); }}
        >
            Save Options
        </Button>
        <br/>
        <br/>
        <Button
          type="button"
          fullWidth
          variant="contained"
          className="submit"
          onClick={() => { this.updateDB(); }}
        >
            Edit Info
        </Button>

          </div>


        </React.Fragment>
      </Paper>);
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo);
