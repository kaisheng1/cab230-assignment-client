import axios from 'axios';

const offences = [
	{ id: 1, name: 'fasdf', number: '12', blow: '21212', hover: 'rqwer', teenager: 'fasdfsdf', stuff: '41234' },
	{ id: 2, name: 'f234f', number: '121324', blow: '21212', hover: 'rqwer', teenager: 'fasdfsdf', stuff: '41234' },
	{ id: 3, name: 'fa444f', number: '12123', blow: '21212', hover: 'rqwer', teenager: 'fasdfsdf', stuff: '41234' }
];

export const checkLogin = async (email, password) => {
	if (email === '' && password === '') {
		return { token: '1234' };
	}
	throw new Error('Wrong username or password');
};

export const registerUser = async (email, password) => {
	if (email === '' && password === '') {
		return true;
	}
	return false;
};

export const fetchOffences = async () => {
	return offences;
};
