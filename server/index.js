require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const sgMail = require('@sendgrid/mail');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = 4000;

// Webhook Stripe needs raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  if (!process.env.STRIPE_WEBHOOK_SECRET) return res.status(503).send('Stripe non configurato');
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Pagamento completato per:', session.customer_email);
    // Qui aggiorneresti il DB Supabase
  }
  res.json({ received: true });
});

app.use(cors());
app.use(express.json());

// Supabase Admin Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = (supabaseUrl && supabaseServiceKey) ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Stripe Checkout
app.post('/api/checkout', async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) return res.status(503).json({ error: 'Stripe non configurato: aggiungi STRIPE_SECRET_KEY' });
  try {
    const { priceId, email } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${req.headers.origin || 'http://localhost:3000'}/app?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'http://localhost:3000'}/pricing`,
      customer_email: email,
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SendGrid Email
app.post('/api/email/send', async (req, res) => {
  if (!process.env.SENDGRID_API_KEY) return res.status(503).json({ error: 'SendGrid non configurato' });
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    const { to, subject, html } = req.body;
    await sgMail.send({ to, from: process.env.EMAIL_FROM || 'noreply@skillforge.com', subject, html });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Anthropic Claude AI
app.post('/api/ai/claude', async (req, res) => {
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'Anthropic non configurato' });
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  try {
    const { prompt } = req.body;
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }]
    });
    res.json({ response: msg.content[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google Gemini AI
app.post('/api/ai/gemini', async (req, res) => {
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'Gemini non configurato' });
  try {
    const { prompt } = req.body;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    res.json({ response: data.candidates[0].content.parts[0].text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Demo endpoints for empty state
app.get('/api/demo/status', (req, res) => res.json({ status: 'ok', services: { supabase: !!supabase, stripe: !!process.env.STRIPE_SECRET_KEY } }));

app.listen(PORT, '0.0.0.0', () => console.log(`Backend in esecuzione su porta ${PORT}`));