import React from 'react';
import * as tutifyStyle from '../../styles/Quiz-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from '../DashBoardNavBar';
import Button from '@material-ui/core/Button';
import axios from "axios";
import swal from '@sweetalert/with-react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Footer from '../Footer';
import Title from '../ProfilePage/Title';

// Displaying the list of students the tutor can share their documents to.
export class StudentGradeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: [],
      attempts: []
    };
  }

  componentDidMount() {
    this.checkSession();
    console.log("HIIIII    "+JSON.stringify(this.state));
    this.loadAttempts();
    this.setState({ fileid: this.props.match.params.file });
  }

  // Handling the checkbox management in order to select one or many options.
  handleCheckbox = async (event) => {
    if (event.target.checked) {
      let list = this.state.shareTo;
      list.push(event.target.name);
      await this.setState({ shareTo: list });
    } else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
    }
  }
  loadAttempts = async () => {
    axios.get('/api/getStudentAttempts', {
      params: {
        studentId: this.state.tutor_id,
      }
    }).then((res) => {
      // fetch the videos
      console.info("Successfully fetched the attempts");
      this.setState({
        attempts: res.data.data
      });
    })
      .catch(err => console.error("Could not get the attempts from the database: " + err));
  }

  // Setting the login state of user.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          this.setState({
            students: res.userInfo.students,
            tutor_id: res.userInfo._id,
            tutorName: res.userInfo.first_name + " " + res.userInfo.last_name,
            tutorImg: res.userInfo.picture,
          })
          // this.FindStudents();
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.error(err));
  };

  // Function that handles how the Share Document button is displayed on the page.
  handleShareDocButton = (tableTitle = false, bottomButton = false) => {
    if (!tableTitle) {
      if (this.props.match.params.file === undefined) {
        return <Button type="button" onClick={() => window.location.replace("/doclist")} variant="contained" size="small" className="submit">Share Document</Button>;
      }
      if (bottomButton) {
        return <Button type="button" style={{ "left": "80%", "top": "10px" }} onClick={event => this.shareDocument(event, this.state.shareTo)} variant="contained" size="small" className="submit">
          Share Document
        </Button>;
      }
    }
  }

  // Function that handles how the View Document button is displayed on the page.
  handleViewDocButton = (stuid, tableTitle = false, bottomButton = false) => {
    if (!tableTitle) {
      if (this.props.match.params.file === undefined) {
        return <Button type="button" onClick={() => window.location.replace("/doc/" + stuid)} variant="contained" size="small" className="submit">View Documents</Button>;
      }
      if (bottomButton) {
        return <Button type="button" style={{ "left": "80%", "top": "10px" }} onClick={event => this.shareDocument(event, this.state.shareTo)} variant="contained" size="small" className="submit">
          Share Document
        </Button>;
      }
    }
  }

  // Getting the student information from database.
  FindStudents = () => {
    axios.post('/api/findStudents', {
      students: this.state.students
    })
      .then((res) => {
        this.setState({ students: res.data.data });
      }, (error) => {
        console.error(error);
      })
  };

  // Share document to selected students
  shareDocument = (e, ids) => {
    for (const studentid in ids) {
      axios.post("/api/students/" + this.state.fileid, {
        id_student: ids[studentid],
        file_name: this.props.match.params.file
      });
    }

    swal("Succesfully shared document to Student(s)!", "", "success");
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper);
    const { attempts } = this.state

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg">
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Documents
              </Typography>
              <Grid container spacing={2}>
                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <p>
                    <Paper className={fixedHeightPaper}>
                      <Title> My Grades </Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Quiz Title</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Points</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {attempts.map((attempt, index) => (
                            <TableRow>
                              <TableCell>{attempt.quiz.title}</TableCell>
                              <TableCell>{attempt.quiz.course.name}</TableCell>
                              <TableCell>{attempt.score}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </p>
                </Grid>
              </Grid>
            </Container>
            {/* Footer */}
            <Footer />
          </main>

        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(StudentGradeView);