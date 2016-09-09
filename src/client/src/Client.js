
function getPosts() {
  return fetch('http://localhost:3001/api/blog', {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON);
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    const error = new Error(`HTTP error ${res.statusText}`);
    error.status = res.statusText;
    error.response = res;
    console.log(error);
    throw error;
  }
}

function parseJSON(res) {
  return res.json();
}

const Client = { getPosts };
export default Client;
