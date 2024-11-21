import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [getData, setGetData] = useState(null);
    const [postResponse, setPostResponse] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        userId: "",
        collegeEmail: "",
        rollNumber: "",
        inputArray: "",
        numbers: "",
        alphabets: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGetRequest = async () => {
        try {
            const response = await axios.get("https://bajaj-backend-1zt8.onrender.com/api/endpoint");
            setGetData(response.data);
        } catch (error) {
            console.error("Error fetching GET data:", error);
        }
    };

    const handlePostRequest = async () => {
        const payload = new FormData();
        payload.append("user_id", formData.userId);
        payload.append("college_email", formData.collegeEmail);
        payload.append("roll_number", formData.rollNumber);
        payload.append("input_array", formData.inputArray);
        payload.append("numbers", formData.numbers);
        payload.append("alphabets", formData.alphabets);
        payload.append("HighestLowerCase", formData.highestLowercase);
        payload.append("PrimeFound", formData.primeFound);
        if (file) payload.append("file", file);

        try {
            const response = await axios.post("https://bajaj-backend-1zt8.onrender.com/api/endpoint", payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setPostResponse(response.data);
        } catch (error) {
            console.error("Error fetching POST data:", error);
        }
    };

    return (
        <div className="App">
            <header>
                <h1>REST API Interaction</h1>
                <p>Send and Receive Data Bajaj Finserv</p>
            </header>

            <main>
                <section className="api-section">
                    <h2>GET Request</h2>
                    <button onClick={handleGetRequest}>Fetch GET Data</button>
                    {getData && (
                        <div className="response-box">
                            <h3>GET Response</h3>
                            <pre>{JSON.stringify(getData, null, 2)}</pre>
                        </div>
                    )}
                </section>

                <section className="api-section">
                    <h2>POST Request</h2>
                    <form className="form-box" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label>User ID:</label>
                            <input
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                placeholder="Enter your User ID"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>College Email:</label>
                            <input
                                type="email"
                                name="collegeEmail"
                                value={formData.collegeEmail}
                                onChange={handleChange}
                                placeholder="Enter your College Email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Roll Number:</label>
                            <input
                                type="text"
                                name="rollNumber"
                                value={formData.rollNumber}
                                onChange={handleChange}
                                placeholder="Enter your Roll Number"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Input Array:</label>
                            <input
                                type="text"
                                name="inputArray"
                                value={formData.inputArray}
                                onChange={handleChange}
                                placeholder='Example: ["a", 1, 2, "b"]'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Numbers:</label>
                            <input
                                type="number"
                                name="numbers"
                                value={formData.numbers}
                                onChange={handleChange}
                                placeholder='Example: ["1", "1", "2", "334"]'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Alphabets:</label>
                            <input
                                type="text"
                                name="alphabets"
                                value={formData.alphabets}
                                onChange={handleChange}
                                placeholder='Example: [“M”,”B”,”Z”,”a”]'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Highest Lower Case:</label>
                            <input
                                type="text"
                                name="HighestLowerCase"
                                value={formData.highestLowercase}
                                onChange={handleChange}
                                placeholder='Example: [”a”]'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Prime Found:</label>
                            <input
                                type="boolean"
                                name="PrimeFound"
                                value={formData.highestLowercase}
                                onChange={handleChange}
                                placeholder= 'Example: true'
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Upload File:</label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".txt,.pdf,.png,.jpg"
                            />
                        </div>

                        <button type="button" onClick={handlePostRequest}>
                            Send POST Request
                        </button>
                    </form>
                    {postResponse && (
                        <div className="response-box">
                            <h3>POST Response</h3>
                            <pre>{JSON.stringify(postResponse, null, 2)}</pre>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
