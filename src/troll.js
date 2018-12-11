import React from 'react';
import io from 'socket.io-client';

const url = 'http://localhost:3000';
// const url = 'https://js-401-socket-io-server.herokuapp.com';
const socket = io.connect(url);

let chatHistory = [];
class Trolling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedInput: '',
      words: ''
    };

    socket.on('incoming', payload => this.updateWords(payload));
  }

  updateWords = (words) => {
    this.setState({ words });
    chatHistory.push(words)
    console.log(chatHistory, 'chat history')
  };

  handleSubmit = event => {
    event.preventDefault();
    socket.emit('troll', this.state.typedInput);
  };

  handleNewWords = event => {
    this.setState({ typedInput: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <h2>{this.state.words}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="typedInput"
            placeholder="New Words"
            onChange={this.handleNewWords}
          />
        </form>
        <ul>
          {chatHistory.map((message, idx) => (
            <li content={message}>h</li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Trolling;
