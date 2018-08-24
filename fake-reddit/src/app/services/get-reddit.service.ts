import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GetRedditService {
  url: string = "https://www.reddit.com/r/";
  reddits;

  // https://www.reddit.com/r/sports/top.json

  constructor(private http: HttpClient) {}

  getReddit(content) {
    console.log(content);
    this.http
      .get(this.url + content + "/top.json")
      .subscribe(data => console.log(data), err => console.log(err));
  }
}
