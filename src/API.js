import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_URL;

//----------------------------------POST--------------------------------------------------------
export const checkLogin = async (email, password) => {
	const response = await axios({
		method: 'POST',
		baseURL,
		url: '/login',
		data: {
			email,
			password
		}
	});
	return response.data.token;
};

export const registerUser = async (email, password) => {
	const response = await axios({
		method: 'POST',
		baseURL,
		url: '/register',
		data: {
			email,
			password
		}
	});
	return response;
};

//----------------------------------------------GET-----------------------------------------------------------
export const fetchStuff = async (stuff) => {
	const url = `/${stuff}`;
	const response = await axios({
		method: 'GET',
		baseURL,
		url
	});
	return response.data[stuff];
};

export const fetchOffences = async () => {
	const response = await axios({
		method: 'GET',
		baseURL,
		url: '/offences'
	});
	return response.data.offences;
};

export const fetchAges = async () => {
	const response = await axios({
		method: 'GET',
		baseURL,
		url: '/ages'
	});
	return response.data.ages;
};

export const fetchAreas = async () => {
	const response = await axios({
		method: 'GET',
		baseURL,
		url: '/areas'
	});
	return response.data.areas;
};

export const searchArea = async (area) => {
	const response = await axios({
		method: 'GET',
		baseURL,
		url: `/area/${area}`
	});
	return response.data[area];
};

export const fetchGenders = async () => {
	const response = await axios({
		method: 'GET',
		baseURL,
		url: '/genders'
	});
	return response.data.genders;
};

export const fetchYears = async () => {
	const response = await axios({
		method: 'GET',
		baseURL,
		url: '/years'
	});
	return response.data.years;
};

export const filterOffence = async (filters) => {
	const response = await axios({
		method: 'GET',
		headers: {
			Authorization: [ 'Bearer', localStorage.getItem('token') ].join(' ')
		},
		baseURL,
		url: '/search',
		params: filters
	});
	return response.data.result;
};
