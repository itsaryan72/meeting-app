// src/Timeline.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';

// Define keyframes first
const highlight = keyframes`
  from {
    background-color: transparent;
  }
  to {
    background-color: ${({ isBooked }) =>
      isBooked ? '#ff0000' : '#00ff6a'};
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TimelineComponent = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    // Static data for demonstration
    const staticMeetings = [
      { title: 'Roadmap Discussion', startTime: '2024-09-02T11:30:00', endTime: '2024-09-02T12:30:00', team: 'Tech Team' },
      { title: 'FY24 OKR Review', startTime: '2024-09-02T14:30:00', endTime: '2024-09-02T15:30:00', team: 'Marketing Team' },
    ];

    setMeetings(staticMeetings);
  }, []);

  const getBookedSlots = () => {
    const slots = [];
    meetings.forEach(meeting => {
      const startHour = moment(meeting.startTime).hour();
      const endHour = moment(meeting.endTime).hour();
      for (let i = startHour; i < endHour; i++) {
        slots[i] = slots[i] || [];
        slots[i].push(meeting.team);
      }
    });
    return slots;
  };

  const bookedSlots = getBookedSlots();

  return (
    <TimelineContainer>
      <ScrollableTimeline>
        {Array.from({ length: 7 }, (_, i) => (
          <HourLine key={i}>
            <HourNumber>{6 + i}:00</HourNumber>
            <LineContainer>
              <Line
                booked={bookedSlots[6 + i]}
                isBooked={bookedSlots[6 + i] && bookedSlots[6 + i].length > 0}
              />
              {bookedSlots[6 + i] && bookedSlots[6 + i].map((team, index) => (
                <TeamBox key={index}>{team}</TeamBox>
              ))}
            </LineContainer>
          </HourLine>
        ))}
      </ScrollableTimeline>
    </TimelineContainer>
  );
};

export default TimelineComponent;

// Styled Components
const TimelineContainer = styled.div`
  width: 300px; /* Adjust width as needed */
  height: 100%;
  background-color: black; /* Black background for the entire timeline */
  color: white;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

const ScrollableTimeline = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: white transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 4px;
  }
`;

const HourLine = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 1s ease-out;
`;

const HourNumber = styled.div`
  width: 50px;
  text-align: right;
  padding-right: 10px;
  color: lightgrey; /* Light grey text for time */
`;

const LineContainer = styled.div`
  flex: 1;
  position: relative;
`;

const Line = styled.div`
  height: 40px;
  background: ${({ isBooked }) =>
    isBooked
      ? 'linear-gradient(90deg, #ff4d4d, #ff0000)' /* Red gradient for booked slots */
      : 'linear-gradient(90deg, #00ff6a, #005f2d)'}; /* Green gradient for free slots */
  border: 1px solid ${({ isBooked }) => (isBooked ? '#ff0000' : '#00ff6a')}; /* Border color matching background gradient */
  position: relative;
  transition: background-color 0.3s ease;
  animation: ${highlight} 1s ease-out;
`;

const TeamBox = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  background-color: #ff0000; /* Red background for team box */
  color: white;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  transform: translateY(-50%);
  z-index: 2;
`;
