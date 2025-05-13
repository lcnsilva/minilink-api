import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid, customAlphabet } from "nanoid";

const prisma = new PrismaClient();

interface UrlParams {
  originalUrl: string;
  expirationTimeInMinutes: number;
  customUrl?: string;
}

type UrlRequest = Request & { body: UrlParams };

class Url {
  public static validateUrlParams(data: any): data is UrlParams {
    try {
      new URL(data.originalUrl);
    } catch {
      return false;
    }
    return (
      typeof data.originalUrl === "string" &&
      typeof data.expirationTimeInMinutes === "number"
    );
  }

  static async createShortenUrl(req: UrlRequest, res: Response) {
    try {
      const data = req.body;
      if (!Url.validateUrlParams(data)) {
        res.status(400).json({ msg: "A URL não está correta" });
      }
      const shortUrl = nanoid();
      const now = new Date();
      const expiresAt = new Date();
      expiresAt.setMinutes(now.getMinutes() + data.expirationTimeInMinutes);
      await prisma.url.create({
        data: {
          originalUrl: data.originalUrl,
          shortUrl: shortUrl,
          createdAt: now,
          expiresAt: expiresAt,
        },
      });
      res.status(201).json({
        msg: `Original URL: ${data.originalUrl} /////// Short URL:${shortUrl}`,
      });
    } catch (error) {
      res.status(400).json({msg: 'error', error})
    }
  }

  static async createOnlyLetterUrl(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!Url.validateUrlParams(data)) {
        res.status(400).json({ msg: "A URL não está correta" });
      }
      const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
      const shortUrl = nanoid();
      const now = new Date();
      const expiresAt = new Date();
      expiresAt.setMinutes(now.getMinutes() + data.expirationTimeInMinutes);
      await prisma.url.create({
        data: {
          originalUrl: data.originalUrl,
          shortUrl: shortUrl,
          createdAt: now,
          expiresAt: expiresAt,
        },
      });
      res.status(201).json({
        msg: `Original URL: ${data.originalUrl} /////// Short URL:${shortUrl}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async createOnlyNumber(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!Url.validateUrlParams(data)) {
        res.status(400).json({ msg: "A URL não está correta" });
      }
      const nanoid = customAlphabet("1234567890", 10);
      const shortUrl = nanoid();
      const now = new Date();
      const expiresAt = new Date();
      expiresAt.setMinutes(now.getMinutes() + data.expirationTimeInMinutes);
      await prisma.url.create({
        data: {
          originalUrl: data.originalUrl,
          shortUrl: shortUrl,
          createdAt: now,
          expiresAt: expiresAt,
        },
      });
      res.status(201).json({
        msg: `Original URL: ${data.originalUrl} /////// Short URL:${shortUrl}`,
      });
    } catch (error) {}
  }

  static async createCustomUrl(req: Request, res: Response): Promise<any> {
    try {
      const data = req.body;
      if (!Url.validateUrlParams(data)) {
        res.status(400).json({ msg: "A URL não está correta" });
      }      
      const now = new Date();
      const expiresAt = new Date();
      expiresAt.setMinutes(now.getMinutes() + data.expirationTimeInMinutes);
      const url = await prisma.url.findUnique({
        where: {
          shortUrl: data.customUrl,
        },
      });
      if (url) {
        return res.status(400).json({ msg: "A URL customizada já existe." });
      } else {
        await prisma.url.create({
          data: {
            originalUrl: data.originalUrl,
            shortUrl: data.customUrl,
            createdAt: now,
            expiresAt: expiresAt,
          },
        });
        return res.status(201).json({
          msg: `Original URL: ${data.originalUrl} /////// Short URL:${data.customUrl}`,
        });
      }
    } catch (error) {}
  }

  static async redirectUrl(req: Request, res: Response): Promise<any> {
    const { shortUrl } = req.params;
    const url = await prisma.url.findUnique({
      where: {
        shortUrl: shortUrl,
      },
    });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ msg: "Url not found" });
    }
  }
}

export default Url;
