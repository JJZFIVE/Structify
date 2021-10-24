import flask
import flask_cors
import json

app = flask.Flask(__name__)
flask_cors.CORS(app)


@app.route("/api/get-times", methods=["POST"])
@flask_cors.cross_origin()
def sign_up():
    req = flask.request.get_json(force=True)
    title = req.get("title", None)
    return [{"title": "Haah", "a": "b"}, {"title": "Haah", "a": "b"}], 200


if __name__ == "__main__":
    app.run(debug=True)
