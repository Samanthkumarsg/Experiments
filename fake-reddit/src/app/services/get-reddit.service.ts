import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GetRedditService {
  url: string = "https://reddit.com/r/";

  constructor() {}

  getReddit(content) {
    console.log(content);
  }
}
