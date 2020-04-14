export class News {

    id: number;
    title: string;
	description: string;
	url: string;
	urlToImage: string;
    publishedAt: string;
    
    constructor(id: number, title: string, description: string, url: string, urlToImage: string, publishedAt: string) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt
    }
}
