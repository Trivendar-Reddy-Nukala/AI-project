# MongoDB AI Agent

A powerful AI-powered database query tool that uses Gemini 2.0 Flash to translate natural language queries into MongoDB commands.

## Features

- 🔌 Connect to any MongoDB instance
- 🤖 Natural language to MongoDB query translation using Gemini AI
- 📊 View generated queries and results
- 🎨 Beautiful, modern UI with real-time feedback
- 🔍 Support for find, aggregate, and count operations

## Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB instance (local or remote)
- Gemini API key

## Backend Setup

1. **Navigate to backend directory and create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env and add your Gemini API key
```

4. **Get Gemini API Key:**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Add it to your `.env` file

5. **Run the Flask backend:**
```bash
python app.py
```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. **Create a new React app (if not already created):**
```bash
npx create-react-app mongodb-agent-frontend
cd mongodb-agent-frontend
```

2. **Install Tailwind CSS:**
```bash
npm install -D tailwindcss
npx tailwindcss init
```

3. **Configure Tailwind (tailwind.config.js):**
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. **Update src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Install lucide-react for icons:**
```bash
npm install lucide-react
```

6. **Replace src/App.js with the React component provided**

7. **Start the development server:**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Connect to MongoDB:**
   - Enter your MongoDB connection URL (e.g., `mongodb://localhost:27017/`)
   - Click "Connect to MongoDB"
   - View the database schema

2. **Query your database:**
   - Enter a natural language query (e.g., "Give me top 5 most selling products today")
   - Click "Execute Query"
   - View the generated MongoDB query
   - See the results

## Example Queries

- "Give me top 5 most selling products today"
- "Show all users who registered last week"
- "Count total orders with status completed"
- "Find products with price greater than 100"
- "List all customers from New York"

## Project Structure

```
mongodb-ai-agent/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js         # React component
│   │   └── index.css      # Tailwind styles
│   └── package.json       # Node dependencies
└── README.md
```

## API Endpoints

### POST /api/connect
Connect to MongoDB and retrieve schema
```json
{
  "connection_url": "mongodb://localhost:27017/"
}
```

### POST /api/query
Execute natural language query
```json
{
  "connection_id": "connection_id_here",
  "prompt": "Give me top 5 most selling products"
}
```

### POST /api/disconnect
Disconnect from MongoDB
```json
{
  "connection_id": "connection_id_here"
}
```

## Troubleshooting

**Backend won't start:**
- Ensure all dependencies are installed
- Check if port 5000 is available
- Verify Gemini API key is set

**Cannot connect to MongoDB:**
- Verify MongoDB is running
- Check connection URL format
- Ensure network access to MongoDB instance

**CORS errors:**
- Ensure Flask-CORS is installed
- Verify backend is running on port 5000

**Gemini API errors:**
- Verify API key is valid
- Check API quota limits
- Ensure internet connection

## Security Notes

⚠️ **Important:**
- Never commit your `.env` file
- Use environment variables for sensitive data
- Implement authentication for production use
- Validate and sanitize all user inputs
- Use secure MongoDB connections (SSL/TLS)

## Technologies Used

- **Backend:** Flask, PyMongo, Google Gemini AI
- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Database:** MongoDB
- **AI:** Gemini 2.0 Flash

## License

MIT License

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.