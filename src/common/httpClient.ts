export interface IHttpClient {
    getPageText(route: string): Promise<string>;
}

export class HttpClient implements IHttpClient {
    public origin: string;

    constructor(origin: string) {
        this.origin = origin;
    }

    public async getPageText(route): Promise<string> {
        const url = new URL(route, this.origin);
        const response = await fetch(url);
        return await response.text();
    }
}