import { Router } from 'express';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ ok: true, version: 'v1' });
});

export default router;
