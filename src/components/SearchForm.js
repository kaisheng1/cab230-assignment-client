import React from 'react';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchForm({ searchOffence }) {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		searchOffence(data.search);
	};
	return (
		<Form inline onSubmit={handleSubmit(onSubmit)}>
			<InputGroup className="mb-3">
				<FormControl name="search" ref={register({ required: true })} />
				<InputGroup.Append>
					<InputGroup.Text>Search</InputGroup.Text>
				</InputGroup.Append>
			</InputGroup>
		</Form>
	);
}

export default SearchForm;
