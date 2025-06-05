import axios from "axios";

export const neonrank = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        Accept: "application/json",
    },
});
