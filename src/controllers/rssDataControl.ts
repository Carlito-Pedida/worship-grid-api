import { Request, Response } from "express";
import RSSParser from "rss-parser";
var cron = require("node-cron");
const feedURLs = ["https://aworshipersjournal.com/feed/"];

const parser = new RSSParser();
export const articles: any[] = [];
const articleURLs = new Set(); // To track unique article URLs - Joe Fix duplicated articles

const parse = async (urls: string[]) => {
  for (const url of urls) {
    const feed = await parser.parseURL(url);
    for (const item of feed.items) {
      // Check if the article URL is unique - Joe Fix duplicated articles
      if (!articleURLs.has(item.link)) {
        articles.push(item);
        articleURLs.add(item.link);
      }
    }
  }
};

parse(feedURLs);

export const getRssFeeds = (req: Request, res: Response) => {
  res.send(articles);
};

const updateRssFeeds = async () => {
  articles.length = 0;
  articleURLs.clear(); // Clear the set of unique article URLs - Joe Fix duplicated articles
  await parse(feedURLs);
  console.log("rss feeds updated");
};
updateRssFeeds();

cron.schedule("* 23 * * *", () => {
  updateRssFeeds();
});
