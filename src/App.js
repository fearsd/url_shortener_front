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
    let div = document.getElementById('url')
    div.style.display = 'none'
    this.setState({url: e.target.value})
  }

  shortUrl = (e) => {
    e.preventDefault()
    async function fetchAsync (state) {
        let req = await fetch('http://localhost:8000/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "exact_url": state.url
            })
        })
        let res = req.json()
        return res
    }

    fetchAsync(this.state, this.props)
        .then(res => {
          this.setState({shortUrl: "http://localhost:8000/" + res.hash_slug})
        })
        .catch(reason => console.log(reason.message))
    let div = document.getElementById('url')
    div.style.display = 'block'
  }

  copyToClipBoard = (e) => {
    let hiddenInput = document.createElement('input')
    hiddenInput.style.position = 'absolute'
    hiddenInput.style.left = '-9999px'
    hiddenInput.value = this.state.shortUrl
    document.body.appendChild(hiddenInput)
    hiddenInput.select()
    document.execCommand('copy', true)
    hiddenInput.remove()
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
          <a id="link" href={this.state.shortUrl}>{this.state.shortUrl}</a>
          <button onClick={(e) => this.copyToClipBoard(e)}>Copy</button>
        </div>
      </div>
    )
  }
}

export default App;
