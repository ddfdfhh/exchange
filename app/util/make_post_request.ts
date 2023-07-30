import axios from "axios";

const base_backend_url =
  process.env.NODE_ENV == "development"
    ? process.env.NEXT_PUBLIC_DEV_BACKEND_URL
    : process.env.NEXT_PUBLIC_PROD_BACKEND_URL;
const MakePostRequest = (
  params: any,
  base_url: string,
  token: string | undefined
): Promise<any> => {
  if (token !== undefined) {
    return axios.post(base_backend_url+ base_url, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }
  else { 
    return axios.post(base_backend_url+base_url, params, {
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
  return axios.post(base_backend_url+base_url, params, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
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

  return axios.get(base_backend_url + base_url + "?" + qs, {
    headers: {
      "Content-Type": "application/json",
       Authorization: "Bearer " + token,
    },
  });
};
const MakeGetRequestNoQuery = (url: string,token:string|undefined): Promise<any> => {
   axios.defaults.headers.common["Authorization"] = 'Bearer '+token;
  return axios.get(base_backend_url + url);
};
const MakeGetRequestRemoteQuery = (params:any,url: string): Promise<any> => {
 console.log('making request')
  return axios.get(url, params);
};
const MakeGetRequestRemoteQueryNoParam = (url: string): Promise<any> => {
 console.log('making request')
  return axios.get(url);
};
export {
  MakePostRequest,
  MakeGetRequestNoQuery,
  MakeGetRequestRemoteQuery,
  MakeGetRequestWithQuery,
  MakePostRequestUrl,
  MakePostRequestFormData,
  MakeGetRequestRemoteQueryNoParam
};
