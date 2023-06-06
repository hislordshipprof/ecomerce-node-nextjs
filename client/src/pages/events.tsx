import EventCard from "@/components/Events/EventCard";
import Header from "@/components/Global/Header";
import React from "react";
import { useSelector } from "react-redux";
// import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  //   const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <div>
        <Header activeHeading={4} />
        <EventCard active={true} />
        <EventCard active={true} />

        {/* <EventCard active={true} data={allEvents && allEvents[0]} /> */}
      </div>
      {/* )} */}
    </>
  );
};

export default EventsPage;
