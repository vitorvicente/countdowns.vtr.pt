import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { withFirebase } from "vtr-react-components/dist/Firebase";
import { VtrHeader } from "vtr-react-components/dist/VtrHeader";
import { VtrFooter } from "vtr-react-components/dist/VtrFooter";

import { getDoc } from "firebase/firestore";

import Card from "./components/Card";


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
		
			<Container>
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
