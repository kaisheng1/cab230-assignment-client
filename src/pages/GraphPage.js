import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetchOffences, fetchStuff, filterOffence } from '../API';

import Layout from '../components/Layout';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function GraphPage() {
	const { register, handleSubmit } = useForm();
	const [ offenceTypes, setOffenceTypes ] = useState([]);
	const [ xAxis, setXAxis ] = useState({
		title: {
			text: 'X'
		},
		categories: [ 1, 2, 3 ]
	});
	const [ yAxis, setYAxis ] = useState({
		title: {
			text: 'Y'
		}
	});
	const [ series, setSeries ] = useState([
		{
			type: 'line',
			data: [ 0, 0, 0 ]
		}
	]);

	useEffect(() => {
		fetchOffences().then((offences) => setOffenceTypes(offences)).catch((err) => console.log(err));
	}, []);

	const onSubmit = ({ type, x, y }) => {
		fetchStuff(x + 's')
			.then((stuff) => {
				setXAxis({
					title: {
						text: x + 's'
					},
					categories: stuff
				});

				const allPromises = stuff.reduce((acc, curr) => {
					const newPromise = new Promise((resolve, reject) => {
						filterOffence({ offence: y, [x]: curr })
							.then((result) => {
								const all = result.reduce((final, { total }) => final + total, 0);
								resolve(all);
							})
							.catch((err) => {
								reject(err.message);
							});
					});
					return [ ...acc, newPromise ];
				}, []);

				Promise.all(allPromises).then((data) => {
					setYAxis({
						title: {
							text: y
						}
					});
					setSeries([
						{
							type,
							data
						}
					]);
				});
			})
			.catch((err) => console.log(err));
	};

	return (
		<Layout>
			<h2>Welcome to graph page</h2>
			<Form inline className="mt-2" onSubmit={handleSubmit(onSubmit)}>
				<Form.Group>
					<Form.Label>Type</Form.Label>
					<Form.Control className="ml-1" name="type" ref={register} as="select">
						{[ 'line', 'bar', 'area', 'scatter' ].map((t) => <option key={t}>{t}</option>)}
					</Form.Control>
				</Form.Group>

				<Form.Group className="ml-3">
					<Form.Label>X Axis</Form.Label>
					<Form.Control className="ml-1" name="x" ref={register} as="select">
						{[ 'age', 'area', 'year', 'gender' ].map((t) => <option key={t}>{t}</option>)}
					</Form.Control>
				</Form.Group>
				<Form.Group className="ml-3">
					<Form.Label>Y Axis</Form.Label>
					<Form.Control className="ml-1" name="y" ref={register} as="select">
						{offenceTypes.map((t) => <option key={t}>{t}</option>)}
					</Form.Control>
				</Form.Group>

				<Button className="ml-3" variant="primary" type="submit">
					Apply
				</Button>
			</Form>
			<HighchartsReact
				highcharts={Highcharts}
				options={{
					title: {
						text: 'The chart'
					},
					chart: {
						height: 500
					},
					xAxis,
					yAxis,
					series
				}}
			/>
		</Layout>
	);
}

export default GraphPage;
