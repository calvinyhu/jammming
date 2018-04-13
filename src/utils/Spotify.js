const clientId = 'c2548b91921142a6b081fa5d419cec1b';
// const clientSecret = '77f6f08823b44a6897c26f514c363e5f';
// const redirectUrl = 'http:%2F%2Flocalhost:3000%2F';
const redirectUrl = 'http://localhost:3000/';
let accessToken;
let authorized = false;
// let authorized = true;

const Spotify = {
    getAccessToken() {
        if (accessToken)
            return accessToken;
        else {

        }
    },
    search(searchTerm) {
        if (authorized) {
            return fetch(`https://api.spotify.com/v1/search?type=${searchTerm}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then(promiseResponse => {
                return promiseResponse.json();
            }).then(jsonResponse => {
                console.log(jsonResponse);
            });
        } else {
            return fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token`, {
                headers: {}
            }).then(promiseResponse => {
                return promiseResponse.json();
            }).then(jsonResponse => {
                console.log(jsonResponse);
            });
        }
    }
};

export default Spotify;
