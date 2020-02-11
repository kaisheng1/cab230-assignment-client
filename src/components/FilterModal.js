import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchAges, fetchGenders, fetchYears, fetchAreas } from '../API';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

const filterKeys = [ 'age', 'area', 'gender', 'year' ];

function FilterModal({ filterResult }) {
	const [ show, setShow ] = useState(false);
	const [ options, setOptions ] = useState({});
	const [ current, setCurrent ] = useState(filterKeys[0]);
	const [ filters, setFilters ] = useState([]);
	const { register, handleSubmit } = useForm();

	useEffect(() => {
		let options = {};
		fetchAges().then((ages) => (options.age = ages));
		fetchGenders().then((genders) => (options.gender = genders));
		fetchYears().then((years) => (options.year = years));
		fetchAreas().then((areas) => (options.area = areas));
		setOptions(options);
	}, []);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const addFilter = (data) => {
		setFilters([ ...filters, { [data.key]: data.value } ]);
	};

	const removeFilter = (filterIndex) => {
		setFilters(filters.filter((filter, index) => index !== filterIndex));
	};

	const applyFilters = () => {
		filterResult(filters);
	};

	return (
		<div>
			<Button variant="primary" onClick={handleShow}>
				Filter
			</Button>

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Filter</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form inline onSubmit={handleSubmit(addFilter)}>
						<Form.Group>
							<Form.Label>Key</Form.Label>
							<Form.Control
								className="ml-1"
								name="key"
								ref={register}
								as="select"
								onChange={(e) => setCurrent(e.target.value)}
							>
								{filterKeys.map((key) => <option key={key}>{key}</option>)}
							</Form.Control>
						</Form.Group>
						<Form.Group className="ml-3">
							<Form.Label>Value</Form.Label>
							<Form.Control className="ml-1" name="value" ref={register} as="select">
								{options[current] && options[current].map((o) => <option key={o}>{o}</option>)}
							</Form.Control>
						</Form.Group>

						<Button className="ml-3" variant="primary" type="submit">
							+
						</Button>
					</Form>

					<Table striped bordered hover className="mt-2">
						<thead>
							<tr>
								<th>Key</th>
								<th>Value</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{filters &&
								filters.map((filter, i) => {
									const key = Object.keys(filter)[0];
									return (
										<tr key={i}>
											<td>{key}</td>
											<td>{filter[key]}</td>
											<td>
												<Button onClick={() => removeFilter(i)}>Remove</Button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={applyFilters}>
						Apply filters
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default FilterModal;
