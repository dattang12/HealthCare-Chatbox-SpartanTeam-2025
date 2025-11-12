// server.js - Updated for IBM watsonx.ai
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 

const app = express();
app.use(cors({
     origin: '*', 
     methods: ['GET', 'POST'],
     credentials: true
   }));
app.use(express.json());

// IBM watsonx.ai Configuration
const IBM_API_KEY = process.env.IBM_API_KEY;
const WATSONX_URL = process.env.WATSONX_URL;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;
const API_VERSION = process.env.API_VERSION;

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Proxy server running!',
    service: 'IBM watsonx.ai',
    deployment: DEPLOYMENT_ID 
  });
});

// Get IAM Token
app.post('/api/iam-token', async (req, res) => {
  try {
    console.log('🔑 Requesting IAM token from IBM Cloud...');

    const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
        apikey: IBM_API_KEY,
      }).toString(),
    });

    const text = await response.text();
    console.log('📥 IAM Response Status:', response.status);

    if (!response.ok) {
      console.error('❌ IAM Error:', text);
      return res.status(response.status).json({
        message: `Failed to retrieve IAM token. Status: ${response.status}`,
        error: text,
      });
    }

    const json = JSON.parse(text);
    console.log('✅ IAM token received');
    res.json({ access_token: json.access_token });
  } catch (err) {
    console.error('❌ IAM Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Chat with watsonx.ai (Standard endpoint)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, token } = req.body;
    console.log('💬 Chat request:', message);

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const url = `${WATSONX_URL}/ml/v4/deployments/${DEPLOYMENT_ID}/ai_service?version=${API_VERSION}`;
    console.log('📡 URL:', url);
    
    const payload = {
      messages: [
        { 
          role: 'user', 
          content: message 
        }
      ]
    };
    
    console.log('📤 Payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Body:', text.substring(0, 500));

if (!response.ok) {
  console.error('❌ watsonx Error:', response.status, text);
  
  // Parse the error and return friendly message
  try {
    const errorJson = JSON.parse(text);
    
    // Check for specific error codes
    if (errorJson.errors && errorJson.errors[0]) {
      const errorCode = errorJson.errors[0].code;
      const errorMessage = errorJson.errors[0].message;
      
      // Handle score_processing_failure (off-topic questions)
      if (errorCode === 'score_processing_failure' || 
          errorMessage.includes('Recursion limit') ||
          errorMessage.includes('stop condition')) {
        return res.json({
          choices: [{
            message: {
              content: "I'm specifically designed to help with healthcare questions. I can assist you with topics like nutrition, exercise, symptoms, medications, preventive care, and general health advice. Could you please ask me a health-related question?"
            }
          }]
        });
      }
      
      // Handle other errors
      return res.json({
        choices: [{
          message: {
            content: `I encountered an issue: ${errorMessage}. Please try rephrasing your question or ask about healthcare topics.`
          }
        }]
      });
    }
    
    // Generic error fallback
    return res.json({
      choices: [{
        message: {
          content: "I apologize, but I'm designed to answer healthcare-related questions. Please ask me about health topics!"
        }
      }]
    });
    
  } catch (parseError) {
    // If can't parse JSON, return generic friendly message
    return res.json({
      choices: [{
        message: {
          content: "I'm here to help with healthcare questions. Please ask me about health-related topics!"
        }
      }]
    });
  }
}

    try {
      const json = JSON.parse(text);
      console.log('✅ Success:', JSON.stringify(json, null, 2));
      res.json(json);
    } catch {
      res.json({ output: { text } });
    }
  } catch (error) {
    console.error('❌ Chat Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Streaming endpoint (for real-time responses)
app.post('/api/chat-stream', async (req, res) => {
  try {
    const { message, token } = req.body;
    console.log('💬 Streaming chat request:', message);

    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const url = `${WATSONX_URL}/ml/v4/deployments/${DEPLOYMENT_ID}/ai_service_stream?version=${API_VERSION}`;
    
    const payload = {
      messages: [
        { 
          role: 'user', 
          content: message 
        }
      ]
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('❌ Streaming Error:', response.status, text);
      return res.status(response.status).json({ error: text });
    }

    // For streaming, we'll collect all chunks and return
    const text = await response.text();
    console.log('📥 Stream Response:', text.substring(0, 500));
    res.json({ output: text });
  } catch (error) {
    console.error('❌ Streaming Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint
app.get('/api/test', async (req, res) => {
  try {
    console.log('🧪 Testing watsonx.ai connection...');
    
    // Get token
    const tokenRes = await fetch('https://iam.cloud.ibm.com/identity/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${IBM_API_KEY}`,
    });

    if (!tokenRes.ok) {
      const error = await tokenRes.text();
      return res.status(500).json({ 
        step: 'token',
        status: tokenRes.status,
        error 
      });
    }

    const { access_token } = await tokenRes.json();
    console.log('✅ Token obtained');

    // Test deployment
    const url = `${WATSONX_URL}/ml/v4/deployments/${DEPLOYMENT_ID}/ai_service?version=${API_VERSION}`;
    const testRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'Hello' }]
      }),
    });

    const testData = await testRes.text();
    
    res.json({
      tokenStatus: 'OK',
      deploymentStatus: testRes.status,
      deploymentResponse: testData,
      success: testRes.ok
    });
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      stack: err.stack 
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log('\n🚀 ===================================');
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
  console.log('📡 Ready to proxy IBM watsonx.ai requests');
  console.log('🔑 IBM API Key configured');
  console.log(`🆔 Deployment ID: ${DEPLOYMENT_ID}`);
  console.log(`🌐 watsonx URL: ${WATSONX_URL}`);
  console.log('===================================\n');
});