import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

// Schema for creating/updating booths
const boothSchema = z.object({
  name: z.string().min(3),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: z.enum(['Booth', 'HQ', 'Police']),
  constituency: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  status: z.enum(['Active', 'Closed']).optional()
});

// GET all booths (with optional location filtering)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { lat, lng, radius = 5 } = req.query; // radius in km

    let booths = await prisma.booth.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Auto-seed for demo if empty
    if (booths.length === 0) {
      await prisma.booth.createMany({
        data: [
          { name: "Varanasi Central Booth", address: "Kashi Vishwanath Complex, Varanasi", lat: 25.3176, lng: 82.9739, type: "Booth", constituency: "Varanasi", city: "Varanasi", state: "UP" },
          { name: "Election Commission HQ", address: "Nirvachan Sadan, New Delhi", lat: 28.61, lng: 77.21, type: "HQ", constituency: "New Delhi", city: "Delhi", state: "Delhi" },
          { name: "Police Security Hub - South", address: "Saket, New Delhi", lat: 28.52, lng: 77.21, type: "Police", constituency: "South Delhi", city: "Delhi", state: "Delhi" },
        ]
      });
      booths = await prisma.booth.findMany();
    }

    // If coordinates provided, filter by distance (simplified Haversine or simple box)
    if (lat && lng) {
      const userLat = parseFloat(lat as string);
      const userLng = parseFloat(lng as string);
      const r = parseFloat(radius as string);

      const filtered = booths.filter(b => {
        const dLat = (b.lat - userLat) * (Math.PI / 180);
        const dLng = (b.lng - userLng) * (Math.PI / 180);
        const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(userLat * (Math.PI / 180)) * Math.cos(b.lat * (Math.PI / 180)) * 
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = 6371 * c; // Earth radius in km
        return distance <= r;
      });

      return res.json(filtered);
    }

    res.json(booths);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booths intelligence' });
  }
});

// POST a new booth (for admin/seeding)
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const validation = boothSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const booth = await prisma.booth.create({
      data: validation.data
    });

    res.status(201).json(booth);
  } catch (error) {
    res.status(500).json({ error: 'Failed to archive booth node' });
  }
});

export default router;
