import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool, initSchema } from './_db';
import { randomUUID } from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await initSchema();
    const pool = getPool();

    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
      res.status(200).json(rows);
      return;
    }

    if (req.method === 'POST') {
      const { title, description, priority, category } = req.body || {};
      if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }
      const id = randomUUID();
      await pool.query(
        'INSERT INTO tasks (id, title, description, priority, category) VALUES ($1, $2, $3, $4, $5)',
        [id, title, description || '', priority || 'medium', category || 'general']
      );
      const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      res.status(201).json(rows[0]);
      return;
    }

    res.setHeader('Allow', 'GET, POST');
    res.status(405).end('Method Not Allowed');
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}


