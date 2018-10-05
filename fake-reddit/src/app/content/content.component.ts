import { Component, OnInit, Input } from "@angular/core";
import { GetRedditService } from "../services/get-reddit.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"]
})
export class ContentComponent implements OnInit {
  data: any;
  constructor(
    private service: GetRedditService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  gotoReddit(data) {
    window.open("https://reddit.com" + data, "_blank");
  }

  getReddit() {
    const category = this.route.snapshot.paramMap.get("category");
    this.service.getReddit(category).subscribe(
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
