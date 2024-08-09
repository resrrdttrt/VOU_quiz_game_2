import React, { Component } from 'react';
/* This is the login component */
class Login extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                username: '',
                password: '',
                submitted: false,
            },
        }
        console.log(localStorage);
        this.handleUChange = this.handleUChange.bind(this);
        this.handlePChange = this.handlePChange.bind(this);

    }

    handleUChange(event) {
        this.state.formData.username = event.target.value;

    }
    handlePChange(event) {
        this.state.formData.password = event.target.value;

    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/signin/", {
            method: 'POST',
            body: JSON.stringify(this.state.formData)
        }).then(response => {
            console.log(response.status);
            if (response.ok) {
                response.json().then(json => {
                    console.log("hello", json)
                    var user = {
                        username: json.username,
                        isadmin: json.admin,
                        isloggedin: true
                    };
                    localStorage.setItem('user', JSON.stringify(user));
                    console.log(JSON.parse(localStorage.getItem('user')));
                    window.location.reload();
                });
            }
            else {
                this.setState({ submitted: true });
            }
        });
    }

    render() {

        if (JSON.parse(localStorage.getItem('user')).isloggedin) return (
            <h1 align="center">You have successfully logged in</h1>
        )

        return (
            <div className="App">
                <div id="login" className="formContainer container">
                    <h1>Login</h1>

                    {this.state.submitted && 
                        <div className="error">Login Failed: Check Your Credentials</div>}
                    
                    <form name="LogIn" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" required className="form-control" name="username" value={this.state.username} onChange={this.handleUChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" required className="form-control" name="password" value={this.state.password} onChange={this.handlePChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default Login;