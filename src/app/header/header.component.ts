import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../Auth/auth.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
	public userIsAuthenticated: boolean = false;
	private authListnerSubs: Subscription;
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {
		this.userIsAuthenticated = this.authService.getIsAuth();
		this.authListnerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
			this.userIsAuthenticated = isAuthenticated;
		});
	}

	ngOnDestroy(): void {
		this.authListnerSubs.unsubscribe();
	}

	logOut() {
		this.authService.logOutUser();
		console.log("User logOut");
		this.router.navigate(["/"]);
	}
}
