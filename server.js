const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || readDotEnvValue(path.join(ROOT, '.env'), 'GEMINI_API_KEY');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

function readDotEnvValue(filePath, key) {
  try {
    const text = fs.readFileSync(filePath, 'utf8');
    const line = text.split(/\r?\n/).find(entry => entry.startsWith(`${key}=`));
    if (!line) return '';
    return line.slice(key.length + 1).replace(/^['"]|['"]$/g, '');
  } catch {
    return '';
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function localReply(message) {
  const lower = String(message || '').toLowerCase();
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(lower)) return 'Hi 👋 I’m Wilson AI. Ask me about Wilson’s projects, skills, or experience!';
  if (lower.includes('how are you')) return 'I’m doing great 😄 Hope you’re having a nice day too! How can I help with Wilson?';
  if (lower === 'thanks' || lower === 'thank you') return 'You’re welcome! Anything else about Wilson I can help with?';
  if (lower === 'go') return 'Where would you like to go? Try: Projects, Skills, Resume, Hire Me, or Interview Qs.';
  if (lower === 'ok' || lower === 'okay') return 'Great! Let me know what you’d like to know about Wilson.';
  if (lower === 'bye' || lower === 'goodbye') return 'Goodbye! Feel free to return anytime to learn more about Wilson.';
  if (lower.includes('resume') || lower.includes('cv')) return 'Wilson’s resume is available from the hero section and the contact card. Use the View Resume button to open it directly.';
  if (lower.includes('hire') || lower.includes('available') || lower.includes('job')) return 'Wilson is open to full-time and internship opportunities. Use the contact section to send a hiring message.';
  if (lower.includes('interview') || lower.includes('recruiter') || lower.includes('screening')) return 'Absolutely — here are recruiter-style interview points you can use:\n• Tell me about Wilson: MCA graduate, ranked 3rd, full-stack developer focused on Python and React.\n• Core strengths: REST APIs, MySQL, UI integration, and shipping production features.\n• Recent experience: 4-month Full Stack Developer internship at VDart.\n• Current learning: Django REST Framework, Docker, and AWS fundamentals.\n• Hiring fit: open to full-time roles and ready to contribute quickly.';
  if (lower.includes('what can you do')) return 'I can help you explore Wilson’s:\n• Projects\n• Skills\n• Resume\n• Experience\n• Certifications\n• Contact information';
  if (lower.includes('project')) return 'Wilson has built projects like:\n• Smart Intern Management System\n• Smart Parking Management System\n• Phishing URL Detection System';
  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech')) return 'Wilson works with Python, JavaScript, PHP, SQL, React.js, HTML5, CSS3, REST APIs, MySQL, Git, and Machine Learning.';
  if (lower.includes('experience') || lower.includes('intern')) return 'Wilson completed a Full Stack Developer internship at VDart Academy from Jan to Apr 2026.';
  if (lower.includes('education') || lower.includes('study') || lower.includes('college')) return 'Wilson is pursuing an MCA at M.A.M Business School, Anna University, and completed a BA in English at St. Peter Arts & Science College.';
  if (lower.includes('contact') || lower.includes('email') || lower.includes('phone')) return 'You can reach Wilson at mwilson312002@gmail.com or +91 70920 15592.';
  if (lower.includes('achievement') || lower.includes('award') || lower.includes('rank')) return 'Wilson earned 3rd rank in MCA and won 2nd prize in Pitch Perfect and Fanton Quiz at MAM CET 2025.';
  if (lower.includes('github') || lower.includes('linkedin')) return 'Wilson’s GitHub is github.com/mwilson312002 and his LinkedIn is linkedin.com/in/wilson-m-074831385.';
  if (lower.includes('go to') || lower.includes('navigate') || lower.includes('show me')) return 'Sure — try Projects, Skills, Resume, Hire Me, or Interview Qs.';
  return 'That’s an interesting question 😊\nI can help with Wilson’s projects, skills, resume, experience, and more.';
}

async function generateReply(message, history = []) {
  if (!GEMINI_API_KEY) {
    return { source: 'local', reply: localReply(message), note: 'Missing GEMINI_API_KEY' };
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: `You are Wilson AI Assistant, a friendly, smart, professional portfolio chatbot for Wilson’s personal developer portfolio website.

Your role:
- Help visitors learn about Wilson
- Answer questions about projects, skills, resume, education, experience, certifications, and contact details
- Handle simple recruiter-style interview questions naturally
- If the user asks about resume or hiring, guide them toward the portfolio resume/contact actions
- Behave like a modern friendly AI assistant
- Keep responses short, clear, human-friendly, and interactive
- Sound confident, warm, and professional
- Help with resume, hiring, and recruiter-style interview questions

Personality:
- Friendly
- Helpful
- Modern
- Slightly casual
- Encouraging
- Smart but not robotic

Important behavior rules:
- Always greet users naturally
- If the user says hi, hello, hey, how are you, good morning, or similar, respond warmly
- If the user talks casually, reply casually and friendly
- For simple general inputs like thanks, ok, go, or bye, respond briefly and steer back to Wilson’s portfolio
- If the user asks something completely unrelated or inappropriate, politely redirect back to Wilson’s portfolio
- If the user asks a simple unrelated question, answer briefly and then gently redirect
- If asked about resume, hiring, or interview prep, give a practical portfolio-focused answer and steer to Wilson’s contact/resume actions when useful

Portfolio-focused abilities:
- Projects
- Technical skills
- Certifications
- Internship experience
- Education
- Resume
- GitHub
- Contact details
- Career interests
- Technologies used

UI-friendly response style:
- Keep answers concise
- Use bullet points when useful
- Avoid very long paragraphs
- Use emojis lightly for friendliness
- Sound natural, not overly formal

Sample welcome message:
Hi 👋 I’m Wilson AI Assistant.
I can help you explore Wilson’s:
• Projects
• Skills
• Resume
• Experience
• Certifications

Ask me anything about Wilson 🚀` }]
      },
      contents: [
        ...Array.isArray(history) ? history.slice(-10) : [],
        { role: 'user', parts: [{ text: message }] }
      ]
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const apiMessage = errorData?.error?.message || `Gemini request failed with status ${response.status}`;
    return { source: 'local', reply: localReply(message), note: apiMessage };
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.map(part => part.text).filter(Boolean).join(' ') || localReply(message);
  return { source: 'gemini', reply };
}

function serveStatic(req, res) {
  const urlPath = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/api/chat' && req.method === 'POST') {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 1_000_000) req.destroy();
    });

    req.on('end', async () => {
      try {
        const body = raw ? JSON.parse(raw) : {};
        const result = await generateReply(body.message || '', body.history || []);
        sendJson(res, 200, result);
      } catch (error) {
        sendJson(res, 500, { error: { message: error?.message || 'Unexpected server error' } });
      }
    });
    return;
  }

  if (req.method === 'GET') {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method not allowed');
});

server.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});