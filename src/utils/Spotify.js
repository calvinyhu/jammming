import axios from 'axios';

const clientId = 'c2548b91921142a6b081fa5d419cec1b';
// const cors = 'https://cors-anywhere.herokuapp.com/';

// Spotify Endpoints
const authEndpoint = 'https://accounts.spotify.com/authorize?';
const searchEndpoint = 'https://api.spotify.com/v1/search?';
const userEndpoint = 'https://api.spotify.com/v1/me';

const redirectUrl = 'https://jammmingspotify.firebaseapp.com/';
const accessTokenRegex = 'access_token=([^&]*)';
const expireTimeRegex = 'expires_in=([^&]*)';

let userId = null;
export let accessToken = null;
export let expireTime = null;

// Implicit Grant Flow
export const getAccessToken = () => {
  const params = `client_id=${clientId}&response_type=token&redirect_uri=${redirectUrl}&scope=playlist-modify-public&show_dialog=true`;
  const authUrl = authEndpoint + params;

  // Redirect user to spotify auth
  window.location = authUrl;
};

export const setAuth = url => {
  accessToken = url.match(accessTokenRegex)
    ? url.match(accessTokenRegex)[1]
    : null;
  expireTime = url.match(expireTimeRegex)
    ? url.match(expireTimeRegex)[1]
    : null;
};

export const search = term => {
  const params = `q=${term}&type=track`;
  const searchUrl = searchEndpoint + params;
  const config = {
    headers: { Authorization: 'Bearer ' + accessToken }
  };

  return axios
    .get(searchUrl, config)
    .then(response => {
      return response.data;
    })
    .catch(searchError => {
      return searchError;
    });
};

const getUserId = () => {
  console.log('Getting user id');
  const userUrl = userEndpoint;
  const config = {
    headers: { Authorization: 'Bearer ' + accessToken }
  };

  return axios.get(userUrl, config).then(response => {
    return response.data.id;
  });
};

const postPlaylist = (userId, playlistName) => {
  const playlistsEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists?`;
  const data = {
    name: playlistName
  };
  const config = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  };

  return axios.post(playlistsEndpoint, data, config).then(response => {
    return response.data.id;
  });
};

const postTracksToPlaylist = (playlistId, trackIds) => {
  const uris = trackIds.map(trackId => {
    return `spotify:track:${trackId}`;
  });

  const playlistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const data = { uris: uris };
  const config = {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  };

  return axios.post(playlistEndpoint, data, config);
};

export const createPlaylist = async (playlistName, trackIds) => {
  try {
    if (!userId) userId = await getUserId();
    const playlistId = await postPlaylist(userId, playlistName);
    await postTracksToPlaylist(playlistId, trackIds);
  } catch (error) {
    console.log(error.response.data.error);
  }
};
