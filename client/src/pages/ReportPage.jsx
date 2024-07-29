import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import mammoth from "mammoth";
import { Link } from "react-router-dom";
import pdfToText from "react-pdftotext";
import Animate from "../components/Animate";

const PROMPT =
  "You are a highly intelligent language model. Analyze the provided research paper, focusing on the abstract, conclusion, and scope for improvement. Provide a precise summary that describes the research purpose and main objective. Do not include this prompt or any instructions in the summary .Make sure the output contains not more than 100 words in total.\n";
function ReportPage() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("home");
  const [loading, setLoading] = useState(false);

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
        // alert('completed');
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let boundary = buffer.indexOf("\n");
      while (boundary !== -1) {
        const jsonString = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 1);

        try {
          const jsonObject = JSON.parse(jsonString);
          setOutput((output) => output + jsonObject.response);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }

        boundary = buffer.indexOf("\n");
      }
    }
    setLoading(false);
  };

  const handleCompile = async () => {
    if (loading) return;
    setLoading(true);
    setOutput("");
    console.log(input);
    try {
      const modelResponse = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3:8b",
          prompt: PROMPT + input,
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
    // setInput('');
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file.type === "application/pdf") {
      pdfToText(file)
        .then((text) => {
          setInput(text);
          console.log(text);
        })
        .catch((error) => console.error("Failed to extract text from pdf"));
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
      console.log(text);
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
    <div className='flex  min-h-screen  bg-black text-white font-mono'>
      <aside
        className={`bg-black border-r-2 border-white text-white p-4 w-64 flex flex-col justify-between ${
          sidebarOpen ? "block" : "hidden sm:block"
        }`}>
        <div className='flex items-center mb-8'>
          <div className='flex space-x-2 text-red-500'>
            <div className='w-3 h-3 rounded-full bg-red-500'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
            <div className='w-3 h-3 rounded-full bg-green-500'></div>
          </div>
          <p className='text-sm ml-2'>Text-Summarizer</p>
        </div>
        <ul className='space-y-3 font-medium text-center'>
          <li
            className={` border-b-2 hover:bg-gray-800 hover:border-t-2 rounded-md   transition p-4 duration-300 ease-in-out`}>
            <Link
              to={"/"}
              className={`cursor-pointer  font-mono px-2 py-1 text-center  rounded-lg ${
                selectedOption === "/home" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/home")}>
              <span className=' text-xl font-mono  font-medium tracking-tight  dark:text-gray-100'>
                Home
              </span>
            </Link>
          </li>

          <li
            className={` border-b-2 hover:bg-gray-800 hover:border-t-2 rounded-md   transition p-4 duration-300 ease-in-out`}>
            <Link
              to={"/ContactUs"}
              className={`cursor-pointer  font-mono px-2 py-1 text-center  rounded-lg ${
                selectedOption === "/contact" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/contact")}>
              <span className=' text-xl font-mono  font-medium tracking-tight  dark:text-gray-100'>
                Contact Us
              </span>
            </Link>
          </li>

          <li
            className={` border-b-2 hover:bg-gray-800 hover:border-t-2 rounded-md   transition p-4 duration-300 ease-in-out`}>
            <Link
              to={"/textsum"}
              className={`cursor-pointer  font-mono px-2 py-1 text-center  rounded-lg ${
                selectedOption === "/history" ? "bg-gray-800" : ""
              }`}
              onClick={() => handleOptionClick("/textsum")}>
              <span className=' text-xl font-mono  font-medium tracking-tight  dark:text-gray-100'>
                Text Summarizer
              </span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className='flex-1 p-4'>
        <button
          className='sm:hidden absolute right-4 top-4 z-10 p-2 rounded-lg ml-6 bg-gray-900 hover:bg-gray-600 focus:outline-none'
          onClick={toggleSidebar}>
          {sidebarOpen ? "X" : "--"}
        </button>

        <div className='text-center mb-8'>
          <div className='flex items-center justify-center text-3xl font-bold font-mono text-white'>
            <svg
              className='w-10 h-10 mr-1 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z'></path>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'></path>
            </svg>
            Report Summary
          </div>
          <div className='border-t border-white w-full my-4'></div>
        </div>

        <div className='flex flex-col items-center justify-center min-h-screen'>
          <div className='relative w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg'>
            {loading && (
              <div className='absolute top-0 right-0 w-5 h-5'>
                <Animate />
              </div>
            )}
            <label
              className='block mb-2 text-sm font-medium text-gray-300'
              htmlFor='file_input'>
              Upload file
            </label>
            <input
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
              id='file_input'
              type='file'
              onChange={handleFileUpload}
            />

            <button
              onClick={handleCompile}
              className='mt-4 py-2 px-4 bg-green-500 text-black rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300'>
              Summarize
            </button>

            <div className='mt-6 p-4 bg-gray-900 border border-gray-700 text-white rounded-lg overflow-auto'>
              {output}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReportPage;
