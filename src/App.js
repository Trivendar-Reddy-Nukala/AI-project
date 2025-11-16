import React, { useState } from 'react';
import { Database, Search, Loader2, CheckCircle2, XCircle, Code } from 'lucide-react';

export default function MongoDBAgent() {
  const [connectionUrl, setConnectionUrl] = useState('mongodb://localhost:27017/');
  const [connectionId, setConnectionId] = useState(null);
  const [schema, setSchema] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [generatedQuery, setGeneratedQuery] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  const connectToMongoDB = async () => {
    setConnecting(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connection_url: connectionUrl })
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setConnectionId(data.connection_id);
        setSchema(data.schema);
      }
    } catch (err) {
      setError('Failed to connect: ' + err.message);
    } finally {
      setConnecting(false);
    }
  };

  const executeQuery = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setResults(null);
    setGeneratedQuery(null);

    try {
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          connection_id: connectionId,
          prompt: prompt
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setGeneratedQuery(data.generated_query);
        setResults(data.results);
      }
    } catch (err) {
      setError('Failed to execute query: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      await fetch(`${API_URL}/disconnect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connection_id: connectionId })
      });
      setConnectionId(null);
      setSchema(null);
      setResults(null);
      setGeneratedQuery(null);
      setPrompt('');
    } catch (err) {
      console.error('Disconnect error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Database className="w-10 h-10" />
            MongoDB AI Agent
          </h1>
          <p className="text-purple-300">Query your MongoDB database using natural language</p>
        </div>

        {/* Connection Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Connection
          </h2>
          
          {!connectionId ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  MongoDB Connection URL
                </label>
                <input
                  type="text"
                  value={connectionUrl}
                  onChange={(e) => setConnectionUrl(e.target.value)}
                  placeholder="mongodb://localhost:27017/"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={connectToMongoDB}
                disabled={connecting}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {connecting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Database className="w-5 h-5" />
                    Connect to MongoDB
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Connected Successfully</span>
                </div>
                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
              
              {schema && (
                <div className="bg-white/5 rounded-lg p-4 max-h-48 overflow-auto">
                  <h3 className="text-sm font-semibold text-purple-300 mb-2">Database Schema:</h3>
                  <pre className="text-xs text-purple-200 font-mono">
                    {JSON.stringify(schema, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Query Section */}
        {connectionId && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Query Database
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Natural Language Query
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Give me top 5 most selling products today"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
              
              <button
                onClick={executeQuery}
                disabled={loading || !prompt.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Query...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Execute Query
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-300">
              <XCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Generated Query Display */}
        {generatedQuery && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Generated MongoDB Query
            </h2>
            <div className="bg-slate-900/50 rounded-lg p-4 overflow-auto">
              <pre className="text-sm text-green-300 font-mono">
                {JSON.stringify(generatedQuery, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Results Display */}
        {results && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">
              Results ({results.length} records)
            </h2>
            <div className="bg-slate-900/50 rounded-lg p-4 max-h-96 overflow-auto">
              <pre className="text-sm text-purple-200 font-mono">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}