import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
 res.sendFile('index.html', { root: process.cwd() });
});

app.post('/api/generate', async (req, res) => {
  try {
    const body = { ...req.body, model: 'claude-sonnet-4-5-20251022' };
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    res.json(await r.json());
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
