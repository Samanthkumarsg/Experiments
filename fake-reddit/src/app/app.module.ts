import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./root/app.component";
import { ContentComponent } from "./content/content.component";
import { AppRoutingModule } from ".//app-routing.module";

@NgModule({
  declarations: [AppComponent, ContentComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
