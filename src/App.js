import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimelineComponent from './Timeline';
import './Timeline.css'; // Import custom styles


function App() {
  const [meetings, setMeetings] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
        setMeetings(response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };

    fetchMeetings();

    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <LeftPanel>
        <h1>The Guardian Group</h1>
        <Status>Available</Status>
        <Details>For 30min</Details>
        <Details>6 seats, Zoom Room</Details>
      </LeftPanel>
      <RightPanel>
        <TimeHeader>
          <TimeDisplay>{currentTime}</TimeDisplay>
          <RefreshButton onClick={() => setCurrentTime(new Date().toLocaleTimeString())}>🔄</RefreshButton>
        </TimeHeader>
        <Timeline>
          {meetings.map((meeting, index) => (
            <TimelineItem key={index} startTime={meeting.startTime} endTime={meeting.endTime}>
              <p>{meeting.title}</p>
              <p>{meeting.startTime} - {meeting.endTime}</p>
            </TimelineItem>
          ))}
        </Timeline>
        <TimelineComponent/>
      </RightPanel>
    </Container>
  );
}

export default App;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const LeftPanel = styled.div`
  flex: 1;
  padding: 20px;
`;

const Status = styled.p`
  background: linear-gradient(90deg, #00ff6a, #005f2d);
  padding: 10px;
  font-size: 1.5rem;
  border-radius: 5px;
`;

const Details = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const RightPanel = styled.div`
  flex: 2;
  background-color: #2a2a2a;
  padding: 20px;
`;

const TimeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TimeDisplay = styled.p`
  font-size: 1.5rem;
`;

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Timeline = styled.div`
  position: relative;
  padding: 20px 0;
  border-left: 2px solid white;
`;

const TimelineItem = styled.div`
  position: relative;
  margin: 10px 0;
  padding-left: 20px;
  background-color: #3a3a3a;
  border-radius: 5px;
  padding: 15px;
  color: white;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 15px;
    width: 10px;
    height: 10px;
    background-color: #00ff6a;
    border-radius: 50%;
  }
`;
