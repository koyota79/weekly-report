from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return 'Hello world!aaaa123123ffff' 

if __name__ == '__main__':
    app.run(debug=True) 