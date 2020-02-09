import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import FilterModal from '../components/FilterModal';
import { fetchOffences } from '../API';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function GridPage() {
	const [ columns, setColumns ] = useState([]);
	const [ data, setData ] = useState([]);
	useEffect(() => {
		fetchOffences().then((offences) => {
			setColumns(Object.keys(offences[0]));
			setData(offences);
		});
	}, []);
	return (
		<Layout>
			<h2>Welcome to grid page</h2>
			<Row className="mt-4">
				<Col>
					<SearchForm />
				</Col>
				<Col className="col-md-auto">
					<FilterModal columns={columns} />
				</Col>
			</Row>
			<Table className="mt-2" responsive striped bordered hover>
				<thead>
					<tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
				</thead>
				<tbody>
					{data.map((row) => <tr key={row.name}>{columns.map((col) => <td key={col}>{row[col]}</td>)}</tr>)}
				</tbody>
			</Table>
		</Layout>
	);
}

export default GridPage;
