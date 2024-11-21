import axios from "axios";
import React, { useState } from "react";

const App = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]);

    const API_URL = "http://127.0.0.1:5000/bfhl"; // Replace with your deployed backend URL

    const handleSubmit = async () => {
        try {
            setError("");
            const parsedInput = JSON.parse(jsonInput);

            const res = await axios.post(API_URL, parsedInput);
            setResponse(res.data);
        } catch (err) {
            setError("Invalid JSON input or server error");
        }
    };

    const renderFilteredResponse = () => {
        if (!response) return null;

        const filteredResponse = {};
        selectedFilters.forEach(filter => {
            if (response[filter]) {
                filteredResponse[filter] = response[filter];
            }
        });

        return (
            <pre>
                {JSON.stringify(filteredResponse, null, 2)}
            </pre>
        );
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>BFHL Challenge</h1>
            <textarea
                rows="6"
                style={{ width: "300px" }}
                placeholder='Enter JSON e.g., { "data": ["A", "1", "b"] }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginTop: "20px" }}>
                <label>Filter Response:</label>
                <select
                    multiple
                    value={selectedFilters}
                    onChange={(e) =>
                        setSelectedFilters(
                            Array.from(e.target.selectedOptions, option => option.value)
                        )
                    }
                    style={{ width: "300px", margin: "10px 0" }}
                >
                    <option value="alphabets">Alphabets</option>
                    <option value="numbers">Numbers</option>
                    <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                </select>
            </div>

            <h3>Filtered Response:</h3>
            {renderFilteredResponse()}
        </div>
    );
};

export default App;
