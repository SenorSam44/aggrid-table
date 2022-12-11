import AgGridTable from "./lib/components/agGridTable"
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
        <AgGridTable
            gridData = {{
                'inlines': {
                    400: {
                        3: 0.35,
                        4:0.0,
                        5: 0.63,
                        255: 0.02
                    },
                    670: {
                        3: 0.35,
                        4:0.0,
                        5: 0.63,
                        255: 0.02
                    }
                },
                'crosslines': {
                    1400: {
                        3: 0.55,
                        4:1.0,
                        5: 0.63,
                        255: 0.42
                    },
                    2670: {
                        3: 0.35,
                        4:0.9,
                        5: 0.83,
                        255: 0.22
                    }
                },
            }}
            labelMap ={{
                3: {
                    name: "material 1",
                    color: "gray"
                },
                4: {
                    name: "material 2",
                    color: "blue"
                },
                5: {
                    name: "water",
                    color: "red"
                },
            }}
        />
    </div>
  );
}

export default App;
