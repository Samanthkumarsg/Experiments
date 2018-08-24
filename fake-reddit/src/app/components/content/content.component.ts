import { Component, OnInit, Input } from "@angular/core";
import { GetRedditService } from "../../services/get-reddit.service";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {
  data: Object;
  category: string = "history";
  constructor(private service: GetRedditService) {}

  gotoReddit(data) {
    window.open("https://reddit.com" + data, "_blank");
  }

  getReddit() {
    this.service.getReddit(this.category).subscribe(res => {
      console.log(res.data.children[0]);
      this.data = res.data.children;
    });
  }

  ngOnInit() {
    this.getReddit();
  }
}
