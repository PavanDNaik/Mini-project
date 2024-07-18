import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import mammoth from "mammoth";
import pdfToText from "react-pdftotext";

const PROMT =
  "You are a highly skilled summarizer. Your task is to provide a concise and precise summary of the provided text, capturing the essential points and main ideas. The summary should be significantly shorter than the original text, ideally no more than one-third of its length. Strictly Do not include any introductory phrases  or explanations in the summary.Dont mention regarding the prompt \n";

function ReportPage() {
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

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
    console.log(input);
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

      //   pdfToText(file)
      //   .then((text) => setInput(text))
      //   .catch((error) => console.error("Failed to extract text from pdf"));
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

  return (
    <div class="max-w-2xl mx-auto">
      <label
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        for="file_input"
      >
        Upload file
      </label>
      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        onChange={handleFileUpload}
      />

      <button onClick={handleCompile}>Summerize</button>

      <div>{output}</div>
    </div>
  );
}

export default ReportPage;
