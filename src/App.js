import React, { useState, useEffect } from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { withFirebase } from "vtr-react-components/dist/Firebase";
import { VtrHeader } from "vtr-react-components/dist/VtrHeader";
import { VtrFooter } from "vtr-react-components/dist/VtrFooter";

import { getDoc } from "firebase/firestore";

const StyledCard = styled.div`
	text-align: center;
	position: relative;
	overflow: hidden;
	border-radius: 5px;
	margin: 0 10px 40px 10px;
	box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
	transition: all 0.3s ease-in-out;
	&:hover {
	    -webkit-transform: translateY(-5px);
		transform: translateY(-5px);

		
		& h3 {
			color: #007bff;
			padding-bottom: 20px;
			padding-top: 20px;
		}
	}

	
	& h3 {
		padding-bottom: 20px;
		padding-top: 20px;
	}
	
	& h4 {
		padding-bottom: 20px;
		padding-top: 20px;
		color: #007bff;
	}
	
`;

const Card = ({title, description, timeEnds}) => {
	const [ days, setDays ] = useState("");
	const [ hours, setHours ] = useState("");
	const [ minutes, setMinutes ] = useState("");
	const [ seconds, setSeconds ] = useState("");
	const [ isDone, setIsDone ] = useState(true);

	useEffect(() => {
		setInterval(countDown, 1000);
	});

	const countDown = () => {
		const difference = timeEnds.toDate().getTime() - (new Date()).getTime();

		if (difference > 0)
			setIsDone(false);

		setDays(Math.floor(difference / (1000 * 60 * 60 * 24)).toString());
		setHours(Math.floor((difference%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)).toString().padStart(2, '0'));
		setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'));
		setSeconds(Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0'));
	};

	return (
		<Col>
			<StyledCard>
				<h3>{title}</h3>
				<p> {description} </p>
				{ !isDone ? <h4> {days} Days {hours}:{minutes}:{seconds} </h4> : <h4> Countdown Complete! </h4>}
			</StyledCard>
		</Col>
	);
}


const App = ({ firebase }) => {
	const [countdowns, setCountdowns] = useState(null);

	useEffect(() => {
		async function loadData() {
			const countdownsDoc = await getDoc(firebase.config("countdowns"));
			
			if (countdownsDoc.exists())
				setCountdowns(countdownsDoc.data());
		}
		
		loadData();
	}, [firebase]);
	
	const CountDownCards = () => Object.entries(countdowns).sort((a, b) => b[1].timeCreated.toDate().getTime() - a[1].timeCreated.toDate().getTime()).map((item, index) => (
			<Card key={index} title={item[1].title} timeEnds={item[1].timeEnds} description={item[1].description} />
		)
	);

	return (
		<>
			<VtrHeader />
		
			<Container style={{minHeight: "50vh"}}>
				<Row lg={2} md={2} sm={1} xl={2} xs={1}>
					{!!countdowns && <CountDownCards />}
				</Row>
			</Container>
			
			<VtrFooter />
		</>
	);
};

const Landing = withFirebase(App);

export default Landing;
