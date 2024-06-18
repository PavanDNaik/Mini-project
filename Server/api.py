from flask import Flask,request,jsonify
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM ,TextIteratorStreamer
from threading import Thread
from flask_cors import CORS, cross_origin

device = "cuda:0" if torch.cuda.is_available() else "cpu"

path="./TextSum-Model/model"
tokenizer = AutoTokenizer.from_pretrained(path)


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def loadModel():
    model = AutoModelForSeq2SeqLM.from_pretrained(path).to(device)
    return model

def getStream(input):
    try:
        streamer = TextIteratorStreamer(tokenizer=tokenizer,skip_prompt=True)

        input=tokenizer(input,max_length=1024,return_tensors="pt",truncation=True).to(device)
        model = loadModel()
        generation_kwargs = dict(input, streamer=streamer, max_new_tokens=32,num_beams=1,max_length=1024)
        thread = Thread(target=model.generate, kwargs=generation_kwargs)
        thread.start()

        for new_text in streamer:
            yield new_text
        
    except RuntimeError as e:
        print(e)

    finally:
        torch.cuda.empty_cache()
        del model

@app.route('/result/', methods = ['POST'])

def hello_world():
    body = request.get_json()
    text = body["text"]
    return app.response_class(getStream(input=text), mimetype='text')

if __name__ == '__main__':
    app.run(port=5000, debug=True)