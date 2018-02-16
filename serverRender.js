import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';
import axios from 'axios';
import config from './config';

export const serverRender = ({type, path}) => (
    axios.get(`${config.serverUrl}/api/${type}/${path}`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderGetCats = () => {
    return axios.get(`${config.serverUrl}/api/get_categories`)
    .then(res => res.data);
}

export const serverRenderPage = ({type, page}) => (
    axios.get(`${config.serverUrl}/api/${type}/all/page/${page}`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderSearch = ({type, path, query}) => (
    axios.get(`${config.serverUrl}/api/${type}/${path}${query}`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderMaintenanceList = () => (
    axios.get(`${config.serverUrl}/api/get_manual_uploads`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderSliderList = () => (
    axios.get(`${config.serverUrl}/api/get_manual_uploads/slider`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderTopAd = () => (
    axios.get(`${config.serverUrl}/api/get_manual_uploads/top_ad`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderRightSide = () => (
    axios.get(`${config.serverUrl}/api/get_manual_uploads/aside/right`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)

export const serverRenderLeftSide = () => (
    axios.get(`${config.serverUrl}/api/get_manual_uploads/aside/left`)
        .then(res => {
            return res.data;
        })
        .catch((err) => console.error(err))
)