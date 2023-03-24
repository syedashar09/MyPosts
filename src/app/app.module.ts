import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HeaderComponent } from "./header/header.component";

//components

import { ErrorInterceptor } from "./error-Interceptor";
import { ErrorComponent } from "./Error/error.component";
import { AppMaterialModule } from "./app-material.module";
import { PostsModule } from "./posts/app-posts.module";
import { AuthModule } from "./Auth/app-Auth.module";

@NgModule({
	declarations: [AppComponent, HeaderComponent, ErrorComponent],
	imports: [
		AppRoutingModule,
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		AppMaterialModule,
		PostsModule,
		AuthModule,
	],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
	bootstrap: [AppComponent],
})
export class AppModule {}
