import {Interface} from "readline";

export const websites = [
    {
        name: "Reuters",
        short: "RT"
    },
    {
        name: "New York Times",
        short: "NYT"
    },
    {
        name: "Washington Post",
        short: "WP"
    },
    {
        name: "Cable News (CNN)",
        short: "CNN"
    }
];

export class ScrapedObj {
    public title: string | null = "";
    public updated: string | null = "";
    public byline: string | null = "";
    public body: string | null = "";
    public link: string | null = "";
    public featured_img: string | null = "";
}