import Puppeteer, {Browser, LaunchOptions, Page} from "puppeteer";
import dotenv from "dotenv";

dotenv.config();


const DEFAULT_BROWSER_OPTIONS = {
    headless: true,
    executablePath: process.env.CHROME_BIN,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
        '--window-size=1920,1080'
    ]
};

export const getBrowser = (): Promise<Browser> => Puppeteer.launch(DEFAULT_BROWSER_OPTIONS);

export const getPage = (browser: Browser, pageUrl: string): Promise<Page> => {
    return browser.newPage().then(async page => {
        await page.goto(pageUrl, {
            waitUntil: "domcontentloaded"
        });
        return page;
    });
}