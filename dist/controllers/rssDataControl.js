"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRssFeeds = exports.articles = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
var cron = require("node-cron");
const feedURLs = ["https://media.rss.com/dailydevotionals/feed.xml"];
const parser = new rss_parser_1.default();
exports.articles = [];
const articleURLs = new Set(); // To track unique article URLs - Joe Fix duplicated articles
const parse = async (urls) => {
    for (const url of urls) {
        const feed = await parser.parseURL(url);
        for (const item of feed.items) {
            // Check if the article URL is unique - Joe Fix duplicated articles
            if (!articleURLs.has(item.link)) {
                exports.articles.push(item);
                articleURLs.add(item.link);
            }
        }
    }
};
parse(feedURLs);
const getRssFeeds = (req, res) => {
    res.send(exports.articles);
};
exports.getRssFeeds = getRssFeeds;
const updateRssFeeds = async () => {
    exports.articles.length = 0;
    articleURLs.clear(); // Clear the set of unique article URLs - Joe Fix duplicated articles
    await parse(feedURLs);
    console.log("rss feeds updated");
};
updateRssFeeds();
cron.schedule("* 23 * * *", () => {
    updateRssFeeds();
});
//# sourceMappingURL=rssDataControl.js.map