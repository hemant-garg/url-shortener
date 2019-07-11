import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import './Homepage.css';

class Homepage extends Component {
  state = {
    longUrl: '',
    shortUrl: '',
    copied: false,
    isError: false,
    errMessage: '',
    loading: false
  };

  onChange = e => {
    this.setState({
      longUrl: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ shortUrl: '', loading: true });
    console.log('submit url');
    axios
      .post('https://easyurlshortener.herokuapp.com/api/url/shorten', {
        longUrl: this.state.longUrl
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          shortUrl: res.data.shortUrl,
          longUrl: '',
          loading: false
        });
      })
      .catch(err => {
        // this.setState({ isError: true, errMessage: err });

        this.setState({ isError: true, loading: false });
        if (err.message === 'Network Error') {
          this.setState({
            errMessage:
              'Network Error :(   Make sure you are connected to the Internet.'
          });
        } else {
          this.setState({
            errMessage: 'Something went wrong, Check your URL.'
          });
        }
        setTimeout(() => {
          this.setState({ isError: false });
        }, 5000);
      });
  };

  onCopyUrl = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 3000);
  };

  render() {
    const {
      shortUrl,
      longUrl,
      copied,
      errMessage,
      isError,
      loading
    } = this.state;
    return (
      <div className="homepage">
        <h1>
          <span>URL</span> SHORTENER
        </h1>
        <div className="description">
          URL Shortener is a free tool to shorten a URL or reduce a link.
          <br />
          Use our <span>URL Shortener</span> to create a shortened link making
          it easy to remember or share.
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            className="input"
            name="longUrl"
            onChange={this.onChange}
            value={longUrl}
            placeholder="Paste your long url here..."
            type="text"
            required
          />
          <button className="button" type="submit">
            <div>Short URL</div>
            <span>
              <i className="fas fa-cut" /> ---
            </span>
          </button>
        </form>

        {loading && <div className="description">Loading...</div>}

        {isError && <div className="description">{errMessage}</div>}

        {shortUrl.length > 1 && (
          <div>
            <div className="description">
              Here is your <span>awesome</span> short URL : )
            </div>
            <div id="shortUrl" className="shortUrl">
              {shortUrl}
              <CopyToClipboard text={shortUrl} onCopy={this.onCopyUrl}>
                <span title="Copy">
                  <i className="fas fa-copy" />
                </span>
              </CopyToClipboard>
            </div>
            {copied && <div className="description">Copied! </div>}
          </div>
        )}

        <footer className="description">
          Made with{' '}
          <span>
            <i className="fas fa-heart" />
          </span>{' '}
          by{' '}
          <a
            href="https://hemantgarg.me/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Hemant Garg </span>
          </a>
        </footer>
      </div>
    );
  }
}

export default Homepage;
