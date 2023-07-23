import axios from "axios";

const MakePostRequest = (
  params: any,
  base_url: string,
  token: string | undefined
): Promise<any> => {
  if (token !== undefined) {
    return axios.post("http://localhost:4000/" + base_url, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }
  else { 
    return axios.post("http://localhost:4000/" + base_url, params, {
      headers: {
        "Content-Type": "application/json",
        
      },
    });
  }
};
const MakePostRequestFormData = (
  params: any,
  base_url: string,
  token: string | undefined
): Promise<any> => {
   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.post("http://localhost:4000/" + base_url, params, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization":"Bearer "+token
     },
  });
};
const MakePostRequestUrl = (
  params: any,
  url: string,
  token: string | undefined
): Promise<any> => {
  return axios.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
const MakeGetRequestWithQuery = (
  parameters: any,
  base_url: string,
  token: string,
): Promise<any> => {
  let qs: string = "";
  for (var key in parameters) {
    let value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }

  return axios.get("http://localhost:4000/"+ base_url + "?" + qs,{
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};
const MakeGetRequestNoQuery = (url: string,token:string|undefined): Promise<any> => {
   axios.defaults.headers.common["Authorization"] = 'Bearer '+token;
  return axios.get("http://localhost:4000/" + url);
};
const MakeGetRequestRemoteQuery = (params:any,url: string): Promise<any> => {
 //  axios.defaults.headers.common["Authorization"] = 'Bearer '+token;
  return axios.get(url, params);
};
export {
  MakePostRequest,
  MakeGetRequestNoQuery,
  MakeGetRequestRemoteQuery,
  MakeGetRequestWithQuery,
  MakePostRequestUrl,
  MakePostRequestFormData,
};
