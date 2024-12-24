import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { AuthData } from "../auth.Model";
import { Subscription } from "rxjs";

@Component({
	selector: "app-signup",
	templateUrl: "./signup.component.html",
	styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
	isLoading = false;
	private authStatusSub: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
			this.isLoading = false;
		});
	}

	OnSignup(signupForm: NgForm) {
		if (signupForm.invalid) return null;
		this.authService.CreateUser(signupForm.value.email, signupForm.value.username, signupForm.value.password);
		console.log(signupForm.value.email, signupForm.value.username, signupForm.value.password);
		signupForm.reset();
	}
	ngOnDestroy(): void {
		this.authStatusSub.unsubscribe();
	}
}
