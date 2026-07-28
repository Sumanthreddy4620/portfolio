// ============================================================
//  Vercel Serverless Function: POST /api/contact
//  Saves contact form submissions to Supabase as a backup.
//  Called in parallel with EmailJS — if email fails, DB backup is safe.
// ============================================================

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL         = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email, and message are required.' });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'Server config error: missing Supabase credentials.' });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const { error } = await supabase.from('contact_messages').insert({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      message: message.trim(),
    });

    if (error) throw new Error(error.message);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[/api/contact] Error:', err);
    return res.status(500).json({ error: err.message || 'Failed to save message.' });
  }
}

