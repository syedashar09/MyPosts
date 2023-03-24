import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";
import { ErrorComponent } from "./Error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private matDialog: MatDialog) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMsg = "";
				if (error.error) {
					errorMsg = `Error: ${error.error.message}`;
				} else {
					errorMsg = `Error: ${error.error.message}`;
				}
				this.matDialog.open(ErrorComponent, { data: { message: errorMsg } });
				// this.errorService.ThrowError(errorMsg);

				return throwError(() => {
					return errorMsg;
				});
			})
		);
	}
}
