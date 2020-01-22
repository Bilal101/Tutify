import React from 'react';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import swal from 'sweetalert';
import axios from 'axios';

// View the Specific Course Page with all of the Course Details.
// Students can view documents.
// Tutors can view and delete documents.
export class ViewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      files: [],
      shouldView: false,
      course_selected: "",
      profileType: "",
      shareTo: []
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.checkSession();
    this.loadFiles();
  }
  
  // Distinguishing the tutor login from student login.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ Toggle: true, shouldView:true });
          if (res.userInfo.__t === "student") {
            this.getUserDataFromDb();
            this.setState({ profileType: res.userInfo.__t });
          }
          else if (res.userInfo.__t === "tutor") {
            this.getTutorDataFromDb();
            this.setState({ profileType: res.userInfo.__t });
          }
        }
        else {
          this.setState({ Toggle: false, shouldView: false });
        }
      })
      .catch(err => console.log(err));
  };

  // Uses our backend api to fetch the courses from our database
  getTutorDataFromDb = () => {
    fetch('/api/getTutorCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(err => console.log(err));
  }

  // Uses our backend api to fetch the courses from our database
  getUserDataFromDb = () => {
    fetch('/api/getUserCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
      })
      .catch(err => console.log(err));
  }

  // Loading all files from the database from the specific course
  async loadFiles() {
    fetch('/api/viewCourse/:coursename')
      .then(res => res.json())
      .then(res => {
        // if the specific course exists, run this if statment.
        if (res.file !== undefined) {
          var courseId = this.props.match.params.coursename;
          var courseName = "";
          // if files exist for the specific course, run this if statment.
          console.log(res.file[0]);
          if (res.file[0] !== undefined) {
            res.file[0].sharedToCourses.forEach(function (err, studentIndex) {
              // get course Name for the course currently being viewed.
              console.log(res.file[0].sharedToCourses[studentIndex]);
              /*if (courseId === res.file[0].sharedToCourses[studentIndex]) {
                courseName = res.file[0].sharedToCourses[studentIndex].name;
              }*/
            });
          }
          else {
            courseName = "No Documents Uploaded";
          }

          if (this.state.shouldView) {
            this.setState({ files: res.file, course_selected: courseName });
          }
          else {
            this.setState({ files: [] });
          }
        }
        else {
          this.setState({ files: [] });
        }
      }

      )
      .catch(err => console.log(err));
  }

  // Allowing for files to be deleted for specific courses.
  deleteFile = (e, ids) => {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete !== null) {
          swal("File Deleted", "", "success")
          axios.post('/api/getSpecificCourseFilestoDelete', {
            file_id: ids
          }
          ).then((res) => { })
            .catch(err => console.log(err));
          window.location.reload();
        }
      });
  }

  // Handling the checkbox management in order to select one or many options.
  handleCheckbox = async (event) => {
    if (event.target.checked) {
      let list = this.state.shareTo;
      list.push(event.target.name);
      console.log(list);
      await this.setState({ shareTo: list });

    } else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
    }
  }

  render() {
    const { classes } = this.props;
    const { files } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <div className={classes.heroContent}>
                  <Container className={classes.container}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      {this.state.course_selected}
                    </Typography>
                  </Container>
                </div>

                <Grid container spacing={3}>
                  <p></p>
                  <Grid item sm={12} className={classes.gridItem}>
                    <Typography>Course Documents</Typography><p></p>
                    <Paper className={classes.tableWrapper}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Download Documents</TableCell>

                            {this.state.profileType === "tutor"
                              ?
                              <TableCell>Select Documents to Delete</TableCell>
                              :
                              <br />
                            }
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {files.map((file, index) => (
                            <TableRow>
                              <TableCell>{file.name}</TableCell>
                              <TableCell>{file.uploadDate}</TableCell>
                              <TableCell>
                                <Button type="button" onClick={() => window.open(file.link, "_blank")} size="small" className="submit">
                                  <GetAppIcon />
                                </Button>
                              </TableCell>
                              {this.state.profileType === "tutor"
                                ?
                                <TableCell>
                                  <Checkbox name={file.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                </TableCell>
                                :
                                <br />
                              }
                            </TableRow>
                          ))}
                          {this.state.profileType === "tutor" && this.state.files.length !== 0
                            ?
                            <TableCell><Button type="button" onClick={event => this.deleteFile(event, this.state.shareTo)} variant="contained" size="small" className="submit">Delete Documents</Button></TableCell>
                            :
                            <br />
                          }
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
              <main>
                {/* Hero unit */}

              </main>
              {/* Footer */}
              <Footer />
            </main>

          </main>
        </React.Fragment>
      </Paper>
    );
  }
}

export default withStyles(CourseViewStyles.styles, { withTheme: true })(ViewCourse);
