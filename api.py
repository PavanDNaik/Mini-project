from flask import Flask,request,jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# from api import app


# path="./model"
# tokenizer = AutoTokenizer.from_pretrained(path)
# model = AutoModelForSeq2SeqLM.from_pretrained(path)

app = Flask(__name__)

# @app.route('/result', methods = ['POST'])
# def hello_world():
#     body = request.get_json()
#     text = body["input"]
#     input_size = body["size"]
#     input=tokenizer(text,return_tensors="pt",truncation=True)
#     output = model.generate(
#     input["input_ids"],
#     max_length=input_size,
#     min_length=input_size-20
#     )
#     return jsonify(tokenizer.decode(output[0], skip_special_tokens=True))

# if __name__ == '__main__':
#     app.run(port=5000, debug=True)

import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

path="./model"
tokenizer = AutoTokenizer.from_pretrained(path)
model = AutoModelForSeq2SeqLM.from_pretrained(path).to(device)

@app.route('/result', methods=['POST'])
def hello_world():
    body = request.get_json()
    text = body["input"]
    input_size = body["size"]
    
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}  # Move inputs to the same device as the model
    
    with torch.no_grad():
        output = model.generate(
            inputs["input_ids"],
            max_length=input_size,
            min_length=input_size - 20
        )
    
    return jsonify(tokenizer.decode(output[0], skip_special_tokens=True))

if __name__ == "__main__":
    app.run()