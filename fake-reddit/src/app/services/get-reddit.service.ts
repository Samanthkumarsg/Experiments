import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GetRedditService {
  url: string = "https://www.reddit.com/r/";

  constructor(private http: HttpClient) {}

  getReddit(content) {
    return this.http.get(this.url + content + "/top.json");
  }
}
