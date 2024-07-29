import { BrowserRouter as Router } from "react-router-dom";
import Dash from "./dash";

function App() {
  return (
    <Router>
      <div className="App">
        <Dash />
      </div>
    </Router>
  );
}

export default App;
