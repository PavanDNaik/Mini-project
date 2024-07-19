import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";
const PROMT =
  "You are a highly skilled summarizer. Your task is to provide a concise and precise summary of the provided text, capturing the essential points and main ideas. The summary should be significantly shorter than the original text, ideally no more than one-third of its length. Strictly Do not include any introductory phrases  or explanations in the summary.Dont mention regarding the prompt \n";
function CompilerPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("home");

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setInput("");
    setOutput("");
    setSidebarOpen(false);
  };

  const handleStream = async (reader) => {
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        alert("completed");
        break;
      }

      // Append the decoded chunk to the buffer
      buffer += decoder.decode(value, { stream: true });

      // Try to parse the buffer as JSON
      let boundary = buffer.indexOf("\n"); // Assuming each JSON object is newline-delimited
      while (boundary !== -1) {
        const jsonString = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 1);

        try {
          const jsonObject = JSON.parse(jsonString);
          // Update the output with the response part of the JSON object
          setOutput((output) => output + jsonObject.response);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }

        boundary = buffer.indexOf("\n");
      }
    }
  };

  const handleCompile = async () => {
    setOutput("");
    try {
      const modelResponse = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3:8b",
          prompt: PROMT + input,
          stream: true,
        }),
      });

      const reader = modelResponse.body.getReader();

      handleStream(reader);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file.type === "application/pdf") {
      reader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);
        parsePdf(typedArray);
      };

      reader.readAsArrayBuffer(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const text = await parseWord(arrayBuffer);
        setInput(text);
      };

      reader.readAsArrayBuffer(file);
    } else if (file.type === "text/plain") {
      reader.onload = (event) => {
        const text = event.target.result;
        setInput(text);
      };

      reader.readAsText(file);
    } else {
      alert(
        "Unsupported file type. Please upload PDF, Word, or plain text documents."
      );
    }
  };

  const parsePdf = async (typedArray) => {
    try {
      const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();

        const pageText = content.items.map((item) => item.str).join(" ");
        text += pageText + " ";
      }

      setInput(text);
    } catch (error) {
      console.error("Error parsing PDF:", error);
    }
  };

  const parseWord = async (arrayBuffer) => {
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-black text-white font-mono">
      <aside
        className={`bg-black border-r-2 border-white text-white p-4 w-64 flex flex-col justify-between ${
          sidebarOpen ? "block" : "hidden sm:block"
        }`}
      >
        <div className="flex items-center mb-8">
          <div className="flex space-x-2 text-red-500">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-sm ml-2">Text-Summarizer</p>
        </div>
        <ul className="space-y-3 font-medium text-center">
          <li
            className={` border-b-2 hover:bg-gray-800 hover:border-t-2 rounded-md   transition p-4 duration-300 ease-in-out`}
          >
            <Link
              to={"/"}
              className={`cursor-pointer  font-mono px-2 py-1 text-center  rounded-lg ${
                selectedOption === "/home" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/home")}
            >
              <span className=" text-xl font-mono  font-medium tracking-tight  dark:text-gray-100">
                Home
              </span>
            </Link>
          </li>

          <li
            className={` border-b-2 hover:bg-gray-800 hover:border-t-2 rounded-md   transition p-4 duration-300 ease-in-out`}
          >
            <Link
              to={"/ContactUs"}
              className={`cursor-pointer  font-mono px-2 py-1 text-center  rounded-lg ${
                selectedOption === "/contact" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/contact")}
            >
              <span className=" text-xl font-mono  font-medium tracking-tight  dark:text-gray-100">
                Contact Us
              </span>
            </Link>
          </li>

          <li
            className={` border-b-2 hover:bg-gray-800 hover:border-t-2 rounded-md   transition p-4 duration-300 ease-in-out`}
          >
            <Link
              to={"/reportpage"}
              className={`cursor-pointer  font-mono px-2 py-1 text-center  rounded-lg ${
                selectedOption === "/history" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/reportpage")}
            >
              <span className=" text-xl font-mono  font-medium tracking-tight  dark:text-gray-100">
                Report Summarizer
              </span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-4 flex flex-col justify-center items-center w-full">
        <button
          className="sm:hidden absolute right-4 top-4 z-10 p-2 rounded-lg ml-6 bg-gray-900 hover:bg-gray-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? "X" : "--"}
        </button>

        <div className="flex items-center justify-center text-3xl font-bold font-mono text-white">
          <svg
            className="w-10 h-10 mr-1 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            ></path>
          </svg>
          TextSummarizer
        </div>

        <div className="border-t border-white w-full my-4"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-6xl  ">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg shadow-green-300 ml-6 mr-6 mt-3">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 text-green-400">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm font-mono text-gray-400">Input</p>
            </div>
            <textarea
              className="w-full h-64 p-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-green-400 focus:border-green-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your code here..."
            ></textarea>
            <div className="flex items-center space-x-5">
              <button
                onClick={handleCompile}
                className="mt-4 py-2 px-4 bg-green-500 text-black rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
              >
                Summarize
              </button>
              <label className="cursor-pointer ml-4">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 11.5a5.5 5.5 0 00-9.9-3.9l-7.6 7.6a4 4 0 105.7 5.7l6.3-6.3a2.5 2.5 0 00-3.5-3.5l-4.9 4.9"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg shadow-green-300 ml-6 mr-6 mt-3">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2 text-green-400">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm text-gray-400">Output</p>
            </div>
            <div className="w-full h-64 p-2 bg-gray-900 border border-gray-700 text-white rounded-lg overflow-auto">
              {output}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CompilerPage;
