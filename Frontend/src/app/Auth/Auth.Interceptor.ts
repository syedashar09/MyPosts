import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(public AuthService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const AuthToken = this.AuthService.getAuthToken();
		// const AuthToken = localStorage.getItem("token");
		console.log(AuthToken);
		const AuthRequest = req.clone({
			headers: req.headers.set("Authorization", "Bearer " + AuthToken),
		});
		return next.handle(AuthRequest);
	}
}
