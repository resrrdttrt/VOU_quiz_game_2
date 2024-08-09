import React, { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      quizzes: [],
      username: "",
      isLoggedIn: false
    };
  }
  /* This is a lifecycle hook. basically called upon rendering of page. This will show the quiz played if logged in */
  componentDidMount() {
    this.state.username = JSON.parse(localStorage.getItem("user")).username;
    this.state.isLoggedIn = JSON.parse(localStorage.getItem("user")).isloggedin;
    const request = new Request(
      "http://127.0.0.1:8080/score-users/" + this.state.username
    );
    
    if(this.state.username !== "") {
      fetch(request)
        .then(response => response.json())
        .then(quizzes => this.setState({ quizzes: quizzes }));
    }
    console.log(this.state.username);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        {JSON.parse(localStorage.getItem("user")).isloggedin && (
          <div className="container">
            <h3>Hey nice to see you back {this.state.username}</h3>
            <h4>
              Head over to <span className="text-success">Play Quiz</span> to
              quiz on your fav topic
            </h4>
            <table>
              <thead>
                <tr className="bg-success">
                  <th>S.No</th>
                  <th>Genre</th>
                  <th>Quiz Name</th>
                  <th> Last Score</th>
                </tr>
              </thead>
              <tbody>
                {this.state.quizzes.map(function(item, key) {
                  return (
                    <tr key={key}>
                      <th>{key + 1}</th>
                      <th>{item.genre}</th>
                      <th>{item.qname}</th>
                      <th>{item.score}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!this.state.isLoggedIn && (
          <h2>Hello Guest, Create an account to play our wonderful quizzes</h2>
        )}
      </div>
    );
  }
}

export default Home;
