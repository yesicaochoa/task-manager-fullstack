import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPool, initSchema } from '../_db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await initSchema();
    const pool = getPool();
    const { id } = req.query as { id: string };

    if (!id) {
      res.status(400).json({ error: 'Missing id' });
      return;
    }

    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      const row = rows[0];
      if (!row) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.status(200).json(row);
      return;
    }

    if (req.method === 'PUT') {
      const { title, description, completed, priority, category } = req.body || {};
      await pool.query(
        `UPDATE tasks
         SET title = COALESCE($1, title),
             description = COALESCE($2, description),
             completed = COALESCE($3, completed),
             priority = COALESCE($4, priority),
             category = COALESCE($5, category),
             updated_at = NOW()
         WHERE id = $6`,
        [title ?? null, description ?? null, completed ?? null, priority ?? null, category ?? null, id]
      );
      const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      const row = rows[0];
      if (!row) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.status(200).json(row);
      return;
    }

    if (req.method === 'DELETE') {
      const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      res.status(200).json({ message: 'Task deleted successfully' });
      return;
    }

    res.setHeader('Allow', 'GET, PUT, DELETE');
    res.status(405).end('Method Not Allowed');
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}


