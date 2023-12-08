import axios from "axios";

const Api = axios.create({ baseURL:"http://localhost:3001/api/",withCredentials:true });

export default Api;