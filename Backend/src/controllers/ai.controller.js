const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    const language = req.body.language; // Capture the language field

    console.log("Request received:", { code, language }); // Debugging log

    if (!code) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        console.error("Error in aiService:", error.message);
        res.status(500).send("Internal Server Error");
    }
};