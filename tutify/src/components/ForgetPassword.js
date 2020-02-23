import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as tutifyStyle from '../styles/SignUp-styles';
import { withStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';
import Footer from './Footer';
import './style.css';
import swal from 'sweetalert';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

export class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: "",
        };
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword = () => {

        //verify email exists in the database, if yes, send link to email otherwise send error
        axios.post('/api/forgotPassword', {
            email: this.state.email,
        })
            .then((res) => {
                if (res.data.success) {
                    swal("Email successfully sent!", "", "success");
                }
                else {
                    swal("Invalid email!", "This email does not belong to a registered user.", "error");
                }

            }, (error) => {
                console.error(error);
            });
    }

    render() {

        return (
            <div>
                <NavBar />
                <Container component="main">
                    <CssBaseline />
                    <div className="paper">


                        <Grid container spacing={3}
                            direction="column"
                            style={{ minHeight: '50vh' }}
                            justify="center"
                            alignItems="center"
                        >

                            <Grid item xs={12} >

                                <Typography variant="h6" color="inherit" style={{ fontWeight: "bold" }}>
                                    Forgot your password?
                </Typography>

                                <Typography variant="h8" color="gray" >
                                    Enter your e-mail address to receive instructions to reset your password
                </Typography>

                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    style={{ width: 350 }}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    margin="dense"
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Grid>


                            <Grid item xs={12} >
                                <Button
                                    name="submit"
                                    type="submit"
                                    style={{ width: 350 }}
                                    variant="contained"
                                    className="loginSubmit"
                                    onClick={() => this.forgotPassword()}
                                >
                                    Submit
                  </Button>

                            </Grid>
                        </Grid>
                    </div>
                    <Footer />
                </Container>
            </div>
        );
    }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(ForgotPassword);

