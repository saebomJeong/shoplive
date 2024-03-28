import { Flex } from "antd";
import "./App.css";
import SwipeCard from "./components/SwipeCard";

function App() {
  return (
    <div style={{ margin: "50px 0" }}>
      <Flex vertical>
        <Flex justify="center">
          <SwipeCard colors={["red", "orange", "green", "blue"]} type="long" />
        </Flex>
        <Flex justify="center">
          <SwipeCard colors={["indigo", "purple"]} type="fat" />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
