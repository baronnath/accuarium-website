// src/helpers/axios.js

import { default as ax } from 'axios';
import config from '../config/app.json';
// const http	= require('http');
// const https = require('https');

const backend = config.backend;

export const axios = ax.create({
	timeout: 60000, // 60sec

	// Keep alive pools and reuses TCP connections so it's faster
	// httpAgget: new http.Agent({ keepAlive: true}),
	// httpsAgget: new https.Agent({ keepAlive: true}),

	// Maximun content lenght up to 50MBs, just in case
	maxContentLenght: 50 * 1000 * 1000
})

export const setHeaders = async (user) => {
	if(!user) {
		user = JSON.parse(localStorage.getItem('user'));
	}

	const token = user.accessToken;
	if (token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	}
	// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	axios.defaults.headers.common['Accept-Language'] = user.locale;
}

export class Api {

	// headers must be set every call as it's deleted after page load
	constructor(user = null) {
    setHeaders(user);
  }

	// Login

	login(params){
		return axios.post(backend.url + '/user/login', params);
	}

	// Tank

	static getTank(id) {
		return this._getTank({tankId: id});
	}

	static getTankByUser(id) {
		return this._getTank({userId: id});
	}

	static _getTank(params){
		return axios.get(backend.url + '/tank', {params: params});
	}


	// Species
	getSpeciesById(speciesId) {
		let params = {speciesId: speciesId};
		return this._getSpecies(params);
	}

	getSpeciesByName(scientificName) {
		let params = {
			scientificName: scientificName
		};
		return this._getSpecies(params);
	}

	getAllSpecies() {
		let params = {};
		return this._getSpecies(params);
	}

	getSitemapReport() {
		let params = {'sitemapReport': true};
		return this._getSpecies(params);
	}

	_getSpecies(params) {
		return axios.get(backend.url + '/species', {params: params});
	}

	speciesSearch(page = 0, query) {
		let params = {
      sort: 'name',
      direction: 'ascending',
      page: page,
    }

    if(!!query)
      params['keyword'] = query;

		return axios.get(backend.url + '/species/search', {params: params})
	}

	// data is a FormData instaca.
	//
	// Example:
	//
	// let data = new FormData();
	// data.append('file', file);
	uploadSpeciesFile(data) {
		return axios.post(backend.url + '/species/uploadFile', data);
	}


	// Compatibilities

	uploadCompatibilityFile(data) {
		return axios.post(backend.url + '/compatibility/uploadFile', data)
	}

	// Locale

	static getLocales(params) {
		return axios.get(backend.url + '/locales');
	}


	// Permissions

	getPermissions(params) {
		return axios.get(backend.url + '/permissions');
	}

	updatePermission(params) {
		return axios.put(backend.url + '/permission', params);
	}


	// User

	static getUser(id) {
		return this._getUser({userId: id});
	}

	static getUserByEmail(email) {
		return this._getUser({email: email});
	}

	static _getUser(params) {
		return axios.get(backend.url + '/user', {params: params});
	}

	getUsers() {
		return axios.get(backend.url + '/users');
	}


  // Leads

  static createLead(params) {
    return axios.post(backend.url + '/lead', params);
  }


  ////////////
  /// BLOG ///
  ////////////

  getPosts(params = {}) {
  	return axios.get(backend.blog + '/wp/v2/posts?_embed', params);
  }

}
