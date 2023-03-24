import { Component, OnInit } from "@angular/core";
import { Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
	isLoading = false;

	constructor(public authService: AuthService, private router: Router) {}

	ngOnInit(): void {}
	OnLogin(loginForm: NgForm) {
		if (loginForm.invalid) return null;
		this.authService.logInUser(loginForm.value.email, loginForm.value.password);
		loginForm.reset();
	}
}
