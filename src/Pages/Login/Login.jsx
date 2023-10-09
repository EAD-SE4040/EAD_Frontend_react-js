import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "50vh",
        width: "100%",
        background: "url('https://en.wikipedia.org/wiki/Train#/media/File:Поезд_на_фоне_горы_Шатрище._Воронежская_область.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.2)",
        padding: "20px",
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const navigate = useNavigate()

    const [account, setAccount] = useState({ username: "", password: "" });

    const handleAccount = (property, event) => {
        const accountCopy = { ...account };
        accountCopy[property] = event.target.value;
        setAccount(accountCopy);
    };


    const handleLogin = (event) => {
        event.preventDefault(); // Prevent form submission
        loginUser()

    };

    const loginUser = () => {
        // You can add your login logic here using axios
        axios.post('/user/login', {
            email: account.username,
            password: account.password
        })
            .then(function (response) {
                if (response.data.userType == "User") {
                    console.log("Can't Login")

                }
                else {
                    console.log(response.data);
                    navigate("/dashboard")

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleLogin}>
                        <TextField
                            onChange={(event) => handleAccount("username", event)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) => handleAccount("password", event)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
