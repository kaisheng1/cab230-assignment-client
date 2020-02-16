import React, { useState, useEffect } from 'react';
import useOffences from '../hooks/useOffences';
import { searchArea } from '../API';

import Layout from '../components/Layout';
import SearchForm from '../components/SearchForm';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MAP_API = process.env.REACT_APP_GOOGLE_API;

function MapPage() {
	const [ lat ] = useState(-25.734968);
	const [ lng ] = useState(133.7751);
	const [ zoom ] = useState(5);
	const [ points, setPoints ] = useState([]);

	const { data, filters, actions } = useOffences();
	const { searchOffence } = actions;

	useEffect(
		() => {
			const allAreas = data.map((d) => d['LGA']);
			const allPromise = allAreas.reduce((acc, curr) => {
				const promise = new Promise((resolve, reject) => {
					searchArea(curr).then((result) => resolve(result)).catch((err) => reject(err.message));
				});
				return [ ...acc, promise ];
			}, []);
			Promise.all(allPromise).then((values) => {
				setPoints(
					values.map((v, i) => ({
						name: data[i]['LGA'],
						total: data[i].total,
						location: values[i]
					}))
				);
			});
		},
		[ data ]
	);

	return (
		<Layout>
			<Row>
				<Col>
					<h2>Welcome to map page</h2>
				</Col>
				<Col>
					<SearchForm offence={filters.offence} searchOffence={searchOffence} />
				</Col>
			</Row>

			<GoogleMap location={{ lat, lng }} zoom={zoom} points={points} />
		</Layout>
	);
}
const MapContainer = ({ google, zoom, location, points }) => {
	const [ state, setState ] = useState({
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
	});

	const onMarkerClick = (props, marker, e) =>
		setState({
			selectedPlace: props,
			total: points.filter((p) => p.name === props.name)[0].total,
			activeMarker: marker,
			showingInfoWindow: true
		});

	const onMapClicked = (props) => {
		if (state.showingInfoWindow) {
			setState({
				...state,
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	return (
		<Map
			google={google}
			onClick={onMapClicked}
			initialCenter={location}
			zoom={zoom}
			style={{ width: '97%', height: '80vh' }}
		>
			{points.map((p) => (
				<Marker key={p.name} title={p.name} name={p.name} position={p.location} onClick={onMarkerClick} />
			))}
			<InfoWindow marker={state.activeMarker} visible={state.showingInfoWindow}>
				<div>
					<h6>
						{state.selectedPlace.name} : {state.total}
					</h6>
				</div>
			</InfoWindow>
		</Map>
	);
};
const GoogleMap = GoogleApiWrapper({ apiKey: MAP_API })(MapContainer);

export default MapPage;
