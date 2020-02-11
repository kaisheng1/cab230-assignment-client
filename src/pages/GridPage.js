import React from 'react';
import { useOffence } from '../context/OffenceContext';
import useOffences from '../hooks/useOffences';

import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';
import FilterModal from '../components/FilterModal';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function GridPage() {
	const { filters, searchOffence, filterResult } = useOffence();
	const { data, columns } = useOffences();

	return (
		<Layout>
			<h2>Welcome to grid page</h2>
			<Row className="mt-4">
				<Col>
					<SearchForm searchOffence={searchOffence} />
				</Col>
				<Col className="col-md-auto">
					<FilterModal filterResult={filterResult} />
				</Col>
			</Row>
			{JSON.stringify(filters)}
			<Table className="mt-2" responsive striped bordered hover>
				<thead>
					<tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
				</thead>
				<tbody>
					{data.map((row, i) => <tr key={i}>{columns.map((col) => <td key={col}>{row[col]}</td>)}</tr>)}
				</tbody>
			</Table>
		</Layout>
	);
}

export default GridPage;
