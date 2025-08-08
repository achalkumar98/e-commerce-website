const backendDomain = "http://localhost:8080";

const Summary_API = {
  signUP: {
    url: `${backendDomain}/api/signup`,
    method : "post",
  },
  signIn : {
  url: `${backendDomain}/api/signin`,
  method : "post",
  },
  current_user : {
    url : `${backendDomain}/api/user-details`,
    method : "get",
  },
  logout_user : {
    url : `${backendDomain}/api/userlogout`,
    method : "get",
  },
  allUser : {
    url: `${backendDomain}/api/all-users`,
    method : "get",
  },
  updateUserData : {
    url : `${backendDomain}/api/update-user`,
    method : "post",
  },
};

export default Summary_API;
