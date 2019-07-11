import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Redirect extends Component {
  state = {
    loading: true,
    notfound: false
  };
  componentDidMount() {
    const { urlCode } = this.props.match.params;
    axios
      .post(`https://easyurlshortener.herokuapp.com/api/url/getUrl`, {
        urlCode
      })
      .then(res => {
        window.location = res.data.longUrl;
      })
      .catch(err => this.setState({ notfound: true, loading: false }));
  }
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            fontSize: '3.5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          Redirecting.....
        </div>
      );
    }

    return (
      <div
        style={{
          fontSize: '3.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh'
        }}
      >
        {this.state.notfound && <p>Page Not Found !</p>}
        <Link
          style={{
            color: '#e44560',
            textDecoration: 'none'
          }}
          to="/"
        >
          Go Home
        </Link>
      </div>
    );
  }
}

export default Redirect;
