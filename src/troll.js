import React from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:3000';
// const url = 'https://js-401-socket-io-server.herokuapp.com';
const socket = io.connect(url);


class Trolling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedInput: '',
      words: '',
      chatHistory: []
    };

    socket.on('incoming', payload => this.updateWords(payload));
    socket.on('outgoing', payload => this.updateWords(payload));
  }

  updateWords = (words) => {

    if(this.state.chatHistory.length > 15){
      this.state.chatHistory = this.state.chatHistory.slice(1, 14);
    }

    this.setState({ words, chatHistory: this.state.chatHistory.concat(words) });
  };

  handleSubmit = event => {
    event.preventDefault();
    socket.emit('troll', this.state.typedInput);
    // this.typedInput.value = '';
  };

  handleNewWords = event => {
    this.setState({ typedInput: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Send a message!</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="typedInput"
            placeholder="Your message..."
            onChange={this.handleNewWords}
          />
        </form>
        <ul>
          {this.state.chatHistory.map( (message) => (
              <li>{message}</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Trolling;
