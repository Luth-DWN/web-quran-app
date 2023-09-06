import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/reducers/counterSlice"; // Impor aksi dari slice

const Dashboard = () => {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Dashboard;
