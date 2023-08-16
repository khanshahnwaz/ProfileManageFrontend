import React from "react";
import Card from "./Card";
import { useEffect, useState, useContext } from "react";
import Error from "../Modals/Error";
import Successful from "../Modals/Successful";
import { ProfileContext } from "@/Context/ProfileState";
const Connection = () => {
  const context = useContext(ProfileContext);
  const [connections, setConnections] = useState([]);
  const [notConnected, setNotConnected] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${context.url}/connection/readConnections`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const result = await response.json();
      console.log("data recieved from ", response);
      setConnections(result.Connected);
      setNotConnected(result.NConnected);
    }
    fetchData();
  }, [context]);

  return (
    <>
      <Error url="/home" />
      <Successful url="/home" />
      <div className="w-full">
        <div className=" sm:w-4/5 w-[90%] sm:px-10 px-5 h-full mx-auto lg:mx-0">
          <div className="min-h-1/2">
            <div className="bg-blue-900 lg:h-1/5 h-[10%] rounded-lg  mb-5">
              <p className="p-2 font-bold text-white">MY CONNECTIONS</p>
            </div>
            <div className="grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-x-5 mb-10">
              {connections.map((item, i) => {
                return <Card key={i} connection={true} data={item} />;
              })}
            </div>
          </div>
          <div className="border-t-2 border-gray-200">
            <h2 className="text-xl font-bold "> People you can connect</h2>
            <div className="grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1  gap-5">
              {notConnected.map((item, i) => {
                return <Card key={i} data={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connection;
