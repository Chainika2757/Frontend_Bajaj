const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mime = require("mime-types");

const app = express();
app.use(cors());
app.use(bodyParser.json());

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post("/bfhl", (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        const numbers = data.filter(item => /^[0-9]+$/.test(item));
        const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));
        const lowerCaseLetters = alphabets.filter(ch => /^[a-z]+$/.test(ch));
        const highestLowercase = lowerCaseLetters.length > 0 ? [lowerCaseLetters.sort().pop()] : [];
        const primeFound = numbers.some(num => isPrime(Number(num)));

        let fileValid = false;
        let fileMimeType = null;
        let fileSizeKb = null;

        if (file_b64) {
            try {
                const fileBuffer = Buffer.from(file_b64, "base64");
                fileMimeType = mime.lookup(fileBuffer) || "unknown";
                fileSizeKb = (fileBuffer.length / 1024).toFixed(2);
                fileValid = true;
            } catch (err) {
                fileValid = false;
            }
        }

        res.status(200).json({
            is_success: true,
            user_id: "Chainika Darekar",
            email: "darekarchainika@gmail.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase,
            is_prime_found: primeFound,
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb
        });
    } catch (err) {
        res.status(400).json({ is_success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
