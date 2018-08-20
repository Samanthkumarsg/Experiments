import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./root/app.component";
import { NavComponent } from "./components/nav/nav.component";
import { ContentComponent } from "./components/content/content.component";

@NgModule({
  declarations: [AppComponent, NavComponent, ContentComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
