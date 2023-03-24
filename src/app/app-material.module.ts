import { NgModule } from "@angular/core";
//material
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
	declarations: [],
	imports: [
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatPaginatorModule,
		MatDialogModule,
	],
	exports: [
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatPaginatorModule,
		MatDialogModule,
	],
})
export class AppMaterialModule {}
