import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [review, setReview] = useState(``);
  const [language, setLanguage] = useState("javascript"); // Default language

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      alert("Code cannot be empty!");
      return;
    }

    try {
      console.log("Code being sent:", code, "Language:", language);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}ai/get-review`, { code, language });


      setReview(response.data);
    } catch (error) {
      console.error("Error from backend:", error.response?.data || error.message);
      alert("Failed to get review. Please check the console for details.");
    }
  }

  return (
    <main className="h-screen w-screen text-2xl p-6 flex flex-col md:flex-row gap-4 bg-gray-900 text-white">
      {/* Left Panel */}
      <div className="flex-1 bg-gray-800 rounded-lg relative  p-4 flex flex-col">
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className="mb-5 bg-gray-700 text-white  p-7 rounded text-2xl"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="php">PHP</option>
          <option value="go">Go</option>
          <option value="ruby">Ruby</option>
        </select>

        <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => prism.highlight(code, prism.languages[language] || prism.languages.javascript, language)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 30,
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          className="mt-4 bg-indigo-500 text-white text-3xl px-6 py-2 rounded-lg hover:bg-indigo-600 self-end"
        >
          Review
        </button>
      </div>

      {/* Right Panel */}
      <div className="flex-1  bg-gray-800 rounded-lg p-4 overflow-auto">
      <h2 className="text-2xl  font-semibold mb-4">Code Review:</h2>
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;