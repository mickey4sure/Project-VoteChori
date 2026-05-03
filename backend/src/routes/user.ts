import { Router } from 'express';
import { prisma } from '../lib/db';

const router = Router();

// Sync Firebase User with PostgreSQL
router.post('/', async (req, res) => {
  const { firebaseUid, email, citizenId } = req.body;

  if (!firebaseUid || !email) {
    return res.status(400).json({ error: 'Missing firebaseUid or email' });
  }

  try {
    const user = await prisma.user.upsert({
      where: { firebaseUid },
      update: { email, citizenId },
      create: { firebaseUid, email, citizenId },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
