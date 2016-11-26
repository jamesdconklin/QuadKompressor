import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

class App extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    // if (document.cookie) {
    //   return;
    // } else {
    //   let alphabet = (
    //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
    //   );
    //   let newUser = ""
    //   while (newUser.length < 64) {
    //     newUser += alphabet[Math.floor(Math.random() * alphabet.length)]
    //   }
    //   document.cookie = newUser
    // }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(App);
