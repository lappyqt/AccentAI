import { HttpClient } from '../common/httpClient';
import * as cheerio from 'cheerio';

export interface IWordAccentService {
    getAccent(word: string): Promise<string>;
}

export class WordAccentService implements IWordAccentService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient('https://где-ударение.рф/');
    }

    public async getAccent(word: string): Promise<string> {
        const pageText = await this.httpClient.getPageText(`в-слове-${word.toLowerCase()}`);
        const $ = await cheerio.load(pageText);

        const rules = $('div.rule').toArray().map(rule => $(rule).text().trim());

        if (rules.length < 1) {
            return `Слово: "${word}" не найдено`;
        } 

        if (rules.length > 1) {
            const words = $('div.word').toArray().map(word => {
                return $(word)
                    .text()
                    .trim()
                    .split('—')
                    .map(x => x.trim())
                    .join(' — ');
            });

            return words.map((word, i) => word.concat(`\n${rules[i]}`)).join('\n');   
        }

        return rules[0].split('—')[1].trim();
    }   
}

export const wordAccentService = new WordAccentService();