const baseUrl = "https://jsonplaceholder.typicode.com/";
export default class ApiHelper {
  static async postData(path, obj) {
    return fetch(`${baseUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.json());
  }

  static async getData(path) {
    return fetch(`${baseUrl}${path}`).then((response) => response.json());
  }
}