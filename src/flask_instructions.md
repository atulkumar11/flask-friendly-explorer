

# Flask Backend Setup Instructions

To complete this React + Flask integration, you need to set up a Flask backend server.
Below is a simple Flask app that will work with the React frontend.

## 1. Local Development Setup

### Create a new directory for your Flask app
```
mkdir flask-backend
cd flask-backend
```

### Set up a virtual environment (recommended)
```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Install Flask and CORS
```
pip install flask flask-cors
```

### Create a file named `app.py` with the following content:
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

### Run the Flask app locally
```
python app.py
```

Your Flask server should now be running at http://localhost:5000.

## 2. Deploying to PythonAnywhere

### Step 1: Sign up for a PythonAnywhere account
Go to [PythonAnywhere](https://www.pythonanywhere.com/) and sign up for a free account.

### Step 2: Create a new web app
1. After logging in, go to the "Web" tab
2. Click "Add a new web app"
3. Choose "Flask" as your web framework
4. Select the latest Python version
5. Choose a name for your app (this will be part of your URL)

### Step 3: Set up your Flask app
1. In the "Code" section of your web app configuration page:
   - Update the path to your Flask application (e.g., `/home/yourusername/mysite/app.py`)
   - Make sure the "WSGI configuration file" is selected

2. Edit the WSGI configuration file:
   - In the Web tab, click the link to your WSGI configuration file
   - Replace the content with:

```python
import sys
path = '/home/yourusername/mysite'
if path not in sys.path:
    sys.path.append(path)

from app import app as application
```

### Step 4: Upload your Flask app
1. Go to the "Files" tab
2. Navigate to your web app directory (e.g., `/home/yourusername/mysite/`)
3. Upload your `app.py` file or create a new one with the same code as above

### Step 5: Install required packages
1. Go to the "Consoles" tab
2. Start a new Bash console
3. Run:
```
pip install flask flask-cors --user
```

### Step 6: Update CORS settings for production
Edit your `app.py` file to specify allowed origins:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Update with your actual React app URL
CORS(app, resources={r"/process": {"origins": ["https://your-react-app.com", "http://localhost:3000"]}})

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
```

### Step 7: Update your React app to use the PythonAnywhere URL
In your React app, update the fetch URL in `Index.tsx` to point to your PythonAnywhere Flask app:

```typescript
// Replace with your actual PythonAnywhere URL
const response = await fetch('https://yourusername.pythonanywhere.com/process', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: inputText }),
});
```

### Step 8: Reload your PythonAnywhere web app
1. Go back to the "Web" tab
2. Click the green "Reload" button for your web app

Your Flask backend is now deployed on PythonAnywhere and ready to receive requests from your React frontend!

## Testing the API Independently

You can test the deployed Flask API using curl:

```
curl -X POST https://yourusername.pythonanywhere.com/process \
     -H "Content-Type: application/json" \
     -d '{"text":"Hello Flask!"}'
```

## Integration Notes

1. Make sure to update the CORS settings with your actual deployed React app URL
2. If using a custom domain for your React app, add that domain to the CORS origins list
3. For the free PythonAnywhere plan, your app will go to sleep after a period of inactivity, which may cause delays in the first request

