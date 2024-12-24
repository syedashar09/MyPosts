import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";

@Component({
	selector: "app-error",
	templateUrl: "./error.component.html",
	styleUrls: ["./error.component.css"],
})
export class ErrorComponent implements OnInit, OnDestroy {
	private errorSub: Subscription;
	constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}

	ngOnInit(): void {}
	OnHandleError() {}

	ngOnDestroy(): void {}
}
