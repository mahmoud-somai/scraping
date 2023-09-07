import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  private scrapingUrl = 'http://localhost:3000/scraping';

  constructor(private http:HttpClient) { }

  PostData(url:string){
    return this.http.post(this.scrapingUrl, url);
  }
}
