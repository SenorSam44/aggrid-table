import AgGridTable from "./lib/components/agGridTable"
import './App.css';
import React from "react";

function App() {
  return (
    <div className="App">
        <AgGridTable
            gridData ={{
                "inlines": {
                    "2394": {
                        "0": 0.8411260682160542,
                        "2": 0.024683350374269074,
                        "12": 0.1341905814096767
                    },
                    "2419": {
                        "0": 0.3974302249015658,
                        "2": 0.0004618506307035793,
                        "12": 0.31048147331544607,
                        "22": 0.2916264511522845
                    },
                    "2444": {
                        "0": 0.0004478280340349306,
                        "1": 0.49994405878988574,
                        "8": 0.49960811317607934
                    },
                    "2469": {
                        "0": 0.0004478280340349306,
                        "1": 0.17698873985487507,
                        "4": 0.362817682673411,
                        "6": 0.20404489259735187,
                        "8": 0.25570085684032706
                    }
                },
                "crosslines": {
                    "4270": {
                        "0": 0.8522527465349897,
                        "2": 0.14774725346501025
                    },
                    "4320": {
                        "0": 0.5353433223167126,
                        "1": 0.14740499797520606,
                        "2": 0.14774725346501025,
                        "3": 0.16950442624307108
                    }
                }
            }}
            labelMap = {{
                "0": {
                    "name": "Water",
                    "color": "ff6900"
                },
                "1": {
                    "name": "Salt",
                    "color": "66ff00"
                },
                "2": {
                    "name": "Sediment",
                    "color": "009e27"
                },
                "3": {
                    "name": "Basement",
                    "color": "0070dd"
                },
                "4": {
                    "name": "Slope mudstone a",
                    "color": "7a008a"
                },
                "5": {
                    "name": "Mass transport deposit",
                    "color": "ee0000"
                },
                "6": {
                    "name": "Slope mudstone b",
                    "color": "dff200"
                },
                "7": {
                    "name": "Slope valley",
                    "color": "00b600"
                },
                "8": {
                    "name": "Submarine canyon system",
                    "color": "009bd7"
                },
                "12": {
                    "name": "Background",
                    "color": "57009f"
                },
                "13": {
                    "name": "H1",
                    "color": "d10000"
                },
                "14": {
                    "name": "H2",
                    "color": "fdcf00"
                },
                "15": {
                    "name": "H3",
                    "color": "00e100"
                },
                "16": {
                    "name": "H4",
                    "color": "00aaa0"
                },
                "17": {
                    "name": "H5",
                    "color": "0000c5"
                },
                "18": {
                    "name": "H6",
                    "color": "ccacac"
                },
                "19": {
                    "name": "H7",
                    "color": "ff8d00"
                },
                "20": {
                    "name": "H8",
                    "color": "3aff00"
                },
                "21": {
                    "name": "H9",
                    "color": "00a247"
                },
                "22": {
                    "name": "H0",
                    "color": "0054dd"
                }
            }}
        />
    </div>
  );
}

export default App;
