import test, { Page } from "@playwright/test";
import { htmlToSlate } from "@slate-serializers/html";
import { Descendant } from "slate";
import { json2csv } from "json-2-csv";
import * as fs from "fs";
import { generateUniqueSlug } from "../src/utils/slug.util";
import config from "../config.json";
import { Crawl } from "./example.type";
import { join } from "path";

test("tuyensinh247_crawler", async ({ page }) => {
  test.setTimeout(10 * 60 * 1000);
  const records: Crawl[] = [];

  for (let i = config.start; i <= config.end; i++) {
    const result = await crawTest(page, `bai-tap-${i}.html`);
    records.push(result);
  }
  fs.writeFileSync(join(__dirname, "..", `crawer.csv`), json2csv(records, {}));
});

const crawTest = async (page: Page, url: string): Promise<Crawl> => {
  await page.goto(`https://tuyensinh247.com/${url}`);

  const title = await page.locator("h1").innerText();
  const answer = htmlToSlate(await page.locator(".magr60").first().innerHTML());

  const fillText = await page.locator(".filltext").first().all();

  const values: Descendant[] = [];

  for (const iterator of fillText) {
    const value = htmlToSlate(await iterator.innerHTML());
    values.push(...value);
  }

  const slug = generateUniqueSlug(title);

  return {
    title,
    slug,
    content: JSON.stringify(values),
    banner: config.banner,
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    author: "661e4b907c47c5cdf91fcdcb",
    tag: "66530786fd861a8671cc5b11",
    comments: [],
    answer: JSON.stringify(answer),
  };
};
