import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthInterceptor } from "./Auth.Interceptor";
import { AppMaterialModule } from "../app-material.module";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
	declarations: [LoginComponent, SignupComponent],

	imports: [AppMaterialModule, FormsModule, BrowserModule, AppRoutingModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AuthModule {}
