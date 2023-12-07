import axios from "axios";

const Api = axios.create({ baseURL:"https://acelearn.online/api/",withCredentials:true });

export default Api;