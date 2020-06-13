import fetch from "unfetch";
import config from "../config";

export const fetcher = (url) => fetch(`${config.apiUrl}${url}`).then((r) => r.json());

export const create = (url, data) => fetch(`${config.apiUrl}${url}`, {
    method: "POST",
    body: JSON.stringify(data)
}).then((r) => r.json());
