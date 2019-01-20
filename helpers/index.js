import axios from 'axios'

let BASE_HEADERS = {
  'Content-Type': 'application/json'
};

export function getHeaders() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem('vuex'));
  let headers =  BASE_HEADERS;

  if (user && user.auth && user.auth.key) {
    return {
      'Authorization': 'Token ' + user.auth.key,
      ...headers
    };
  } else {
    return headers
  }
}


// function handleResponse(response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         // logout();
//         location.reload(true);
//       }
//
//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }
//
//     return data;
//   });
// }
