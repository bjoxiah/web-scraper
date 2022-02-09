import { getBrowser, getPage } from "../util/puppeteer";
import {ScrapedObj} from "../util/websites";
import logger from "../util/logger";

export const Scrape = async (url: string, newspaper: string): Promise<ScrapedObj|null> => {
    try {
        const browser = await getBrowser().then(res => res);
        const page = await getPage(browser, url).then(res => res);
        let data = new ScrapedObj();
        switch (newspaper) {
            case "CNN":
                [data.title, data.byline, data.featured_img] = await Promise.all([
                    page.$eval("h1.Article__title", elt => elt?.textContent || null),
                    page.$eval("div.Article__subtitle", elt => elt?.textContent || null),
                    // page.$eval("div.Article__body", elt => elt?.innerHTML || null),
                    page.$eval("div.CaptionedImage__component > div.Image__component > img.Image__image", elt => elt?.getAttribute('src') || null)
                ]);
                break;

            case "RT":
                [data.title, data.byline, data.updated, data.body] = await Promise.all([
                    page.$eval("h1.Headline-headline-2FXIq", elt => elt?.textContent || null),
                    page.$eval("p.Byline-byline-1sVmo", elt => elt?.textContent || null),
                    page.$eval("time.TextLabel__text-label___3oCVw", elt => elt?.textContent || null),
                    page.$eval("div.ArticleBodyWrapper", elt => elt?.innerHTML || null)
                ]);
                break;

            case "NYT":
                [data.title, data.byline, data.updated, data.featured_img] = await Promise.all([
                    page.$eval("h1.css-15m43iq", elt => elt?.textContent || null),
                    page.$eval("span.css-1baulvz > a.css-mrorfa", elt => elt?.textContent || null),
                    page.$eval("time.css-x7rtpa", elt => elt?.textContent || null),
                    page.$eval("div.css-bsn42l > picture > img.css-rq4mmj", elt => elt?.getAttribute("src") || null)
                ]);
                break;

            case "WP":
                [data.title, data.byline, data.updated, data.featured_img] = await Promise.all([
                    page.$eval("h1#main-content > span", elt => elt?.textContent || null),
                    page.$eval("div.font-xxxs > a.gray-darkest", elt => elt?.textContent || null),
                    page.$eval("div.font-xxxs > span.display-date", elt => elt?.textContent || null),
                    page.$eval("div[data-qa=lede-art] > figure > div > img", elt => elt?.getAttribute("src") || null)
                ]);
                break;
            default:
                break;
        }

        await page.close();
        await browser.close();

        return Object.assign(data, {link: url});
    }
    catch (e) {
        logger.error(e);
        return null;
    }
};