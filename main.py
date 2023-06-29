from flask import Flask,render_template,jsonify,request
from flask_pymongo import PyMongo

import openai

openai.api_key ="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"

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="",
  temperature=1,
  max_tokens=256,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)

app = Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/chatgpt"
mongo=PyMongo(app)

@app.route("/")
def home():
    chats=mongo.db.chats.find({})
    mychats=[chat for chat in chats]
    return render_template("index.html",mychats=mychats)

@app.route("/api",methods=["GET","POST"])
def qa():
    if request.method=="POST":
        print(request.json)
        question=request.json.get("question")
        chat=mongo.db.chats.find_one({"question":question})
        if chat:
            data={"question":question,"answer":chat["answer"]}
            return jsonify(data)
        else:
            
            response = openai.Completion.create(
                model="text-davinci-003",
                prompt=question,
                temperature=1,
                max_tokens=256,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0
            )
            mongo.db.chats.insert_one({"question":question,"answer":response["choices"][0]["text"]})
            data={"question":question,"answer":response["choices"][0]["text"]}
            return jsonify(data)
    data={"result":"hii this is the json data "} 
    return jsonify(data)
    # return render_template("index.html")


app.run(debug=True)