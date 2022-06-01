import React, { Component } from 'react';
import './App.css';

import $ from 'jquery';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Não checado', albumArt: '' }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          nowPlaying: { 
              name: res.item.name, 
              albumArt: res.item.album.images[0].url
            }
        });
      })
  }

  render() {
    return (
      <div className="App">
        <button className="login"><a href="http://localhost:8888/">Logar Com Spotify</a></button>
        <p>Tocando: { this.state.nowPlaying.name }</p>
        <p><img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/></p>
        { this.state.loggedIn && // booleano pra renderizar somenta quando estiver logado
        <button onClick={() => this.getNowPlaying()}>
          Checar Ouvindo
        </button>
      }
      </div>
    );
  }
  }

export default App;
