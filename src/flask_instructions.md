
# Flask Backend Setup Instructions

To complete this React + Flask integration, you need to set up a Flask backend server.
Below is a simple Flask app that will work with the React frontend.

## 1. Create a new directory for your Flask app
```
mkdir flask-backend
cd flask-backend
```

## 2. Set up a virtual environment (recommended)
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

## 3. Install Flask and CORS
```
pip install flask flask-cors
```

## 4. Create a file named `app.py` with the following content:
```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

@app.route('/process', methods=['POST'])
def process_text():
    data = request.json
    
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    # Process the text (in this example, we'll just reverse it)
    input_text = data['text']
    processed_text = input_text[::-1]
    
    return jsonify({
        'original_text': input_text,
        'processed_text': processed_text
    })

if __name__ == '__main__':
    app.run(debug=True)
```

## 5. Run the Flask app
```
python app.py
```

Your Flask server should now be running at http://localhost:5000.

## Testing the API Independently

You can test the Flask API using curl:

```
curl -X POST http://localhost:5000/process \
     -H "Content-Type: application/json" \
     -d '{"text":"Hello Flask!"}'
```

## Integration Notes

1. The React app is configured to send requests to http://localhost:5000/process
2. Make sure your Flask server is running before using the React frontend
3. The Flask server needs to be running in the same computer as the React app is being accessed from, unless you modify the CORS settings and update the API URL in the React code
