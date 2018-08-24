import { Component, OnInit, Input } from "@angular/core";
import { GetRedditService } from "../../services/get-reddit.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {
  data: any;
  category: string = "history";
  constructor(private service: GetRedditService) {}

  gotoReddit(data) {
    window.open("https://reddit.com" + data, "_blank");
  }

  getReddit() {
    this.service.getReddit(this.category).subscribe(
      res => {
        this.data = res.data.children;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getReddit();
  }
}
