import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid, customAlphabet } from "nanoid";

const prisma = new PrismaClient();

interface UrlParams {
  originalUrl: string;
  expirationTimeInMinutes: number;
  customUrl?: string;
}

interface UrlReturnObject{
  originalUrl: string,
  shortUrl: string,
  clickAmount?: number;
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
      const urlObject = await prisma.url.create({
        data: {
          originalUrl: data.originalUrl,
          shortUrl: shortUrl,
          createdAt: now,
          expiresAt: expiresAt,
        },
      });
      
      res.status(201).json({
        originalUrl: urlObject.originalUrl,
        shortUrl: urlObject.shortUrl,
      });
    } catch (error) {
      res.status(400).json({ msg: "error", error });
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
      const urlObject = await prisma.url.create({
        data: {
          originalUrl: data.originalUrl,
          shortUrl: shortUrl,
          createdAt: now,
          expiresAt: expiresAt,
        },
      });
      res.status(201).json({
        originalUrl: urlObject.originalUrl,
        shortUrl: urlObject.shortUrl,
      });
    } catch (error) {
      res.status(400).json({ msg: "error", error });
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
      const urlObject = await prisma.url.create({
        data: {
          originalUrl: data.originalUrl,
          shortUrl: shortUrl,
          createdAt: now,
          expiresAt: expiresAt,
        },
      });
      res.status(201).json({
        originalUrl: urlObject.originalUrl,
        shortUrl: urlObject.shortUrl,
      });
    } catch (error) {
      res.status(400).json({ msg: "error", error });
    }
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
        return res.status(409).json({ msg: "A URL customizada já existe." });
      } else {
        const urlObject = await prisma.url.create({
          data: {
            originalUrl: data.originalUrl,
            shortUrl: data.customUrl,
            createdAt: now,
            expiresAt: expiresAt,
          },
        });
        res.status(201).json({
          originalUrl: urlObject.originalUrl,
          shortUrl: urlObject.shortUrl,
        });
      }
    } catch (error) {
      res.status(400).json({ msg: "error", error });
    }
  }

  static async redirectUrl(req: Request, res: Response): Promise<any> {
    const { shortUrl } = req.params;
    const url = await prisma.url.findUnique({
      where: {
        shortUrl: shortUrl,
      },
    });
    if (url) {
      await prisma.url.update({
      where: {
        shortUrl: shortUrl
      }, data: {
        clickAmount: {increment: 1}
      }
    })
      return res.status(302).redirect(url.originalUrl);
    } else {
      if(process.env.REDIRECT_URL){
        return res.status(302).redirect(process.env.REDIRECT_URL)
      } else {
        return res.status(404).json({ msg: "A URL não foi encontrada." });
      }
    }
  }

  static async getUrlClickRank(req: Request, res: Response): Promise<any>{
    try {
      const UrlList = await prisma.url.findMany({
        orderBy:{
          clickAmount: 'desc'
        }
      })
      const UrlObject: UrlReturnObject[] = UrlList.map(url => ({
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        clickAmount: url.clickAmount,
      }));
      if(UrlObject){
        return res.status(200).json({UrlObject});
      } else {
        return res.status(404).json({msg: "Não foi encontrada nenhuma URL."});
      }
    } catch (error) {
      return res.status(400).json({msg: "Bad request", error});
    }
  }
}

export default Url;
