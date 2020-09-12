import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      shortUrl: ''
    }
  }

  handleUrlChange(e) {
    this.setState({url: e.target.value})
  }

  shortUrl = (e) => {
    e.preventDefault()
    let div = document.getElementById('url')
    div.style.display = 'block'
    div.children[0].href = this.state.url
    div.children[0].innerText = this.state.url
  }

  render() {
    return (
      <div className="App">
        <h1>URL shortener</h1>
        <form>
          <input type="text" value={this.state.url} onInput={(e) => this.handleUrlChange(e)} placeholder="Enter your url"></input>
          <button onClick={(e) => this.shortUrl(e)}>Short</button>
        </form>
        <div id="url">
          <a href=''>{this.state.shortUrl}</a>
        </div>
      </div>
    )
  }
}

export default App;
