import React from 'react';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

function SearchForm() {
	return (
		<Form inline>
			<InputGroup className="mb-3">
				<FormControl />
				<InputGroup.Append>
					<InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
				</InputGroup.Append>
			</InputGroup>
		</Form>
	);
}

export default SearchForm;
