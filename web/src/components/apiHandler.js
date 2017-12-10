
import { API_URL } from '../config.json';


class ApiHandler {

  login = async (email, password) => {
    const endpoint = '/users/auth';
    const params = {
      email: email,
      password: password,
    };
    let result = await this.api(endpoint, params, 'POST');
    return result;
  }


  addTransaction = async (citizenID, doctorID) => {
    const endpoint = '/transactions';
    const params = {
      citizenID: citizenID,
      doctorID: doctorID,
    };
    let result = await this.api(endpoint, params, 'POST');
    return result;
  }


  signup = (email, password, firstname, lastname, role) => {
    const endpoint = '/users/register';
    const params = {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      role:role
    };
    return this.api(endpoint, params, 'POST');
  }

  api = async (endpoint, params = null, method = 'get') => {
    try {

      let request = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };
      console.log(params);
      if (params && method !== 'get')
        request.body = JSON.stringify(params);
      const response = await fetch(`${API_URL}${endpoint}`, request);
      console.log('responseresponse', response);
      const responseData = await response.json();

      console.log('responseData', responseData);
      console.log(responseData);
      if (response.status >= 400) {
        if ((responseData.message != "Invalid username or password") && (responseData.message != "User is not signed in")){
          alert(
            'Error',
            responseData.message,
            [
              { text: 'Fermer', onPress: () => { } },
            ]
          );
        }
      };
      return responseData;

    } catch (e) {
      alert(
        'Error',
        e.message,
        [
          { text: 'Fermer', onPress: () => { } },
        ]
      );
      console.log("a problem came up");
      return { message: e.message };
    }
  }

}

export default new ApiHandler();
