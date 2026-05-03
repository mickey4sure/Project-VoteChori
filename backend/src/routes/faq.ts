import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Get all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
});

// Create/Update FAQ (used by AI or admin)
router.post("/", async (req, res) => {
  const { question, answer, category } = req.body;
  try {
    const faq = await prisma.faq.upsert({
      where: { question },
      update: { answer }, // Update answer if question already exists
      create: { question, answer, category: category || "General" },
    });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: "Failed to save FAQ" });
  }
});

export default router;
