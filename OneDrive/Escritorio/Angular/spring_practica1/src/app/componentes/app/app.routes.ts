import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat-component/chat-component.component';
import { HttpClientModule } from '@angular/common/http';

// Exporta el array de rutas
export const appRoutes: Routes = [
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)], // Configura las rutas
  exports: [RouterModule], // Exporta RouterModule
})
export class AppRoutingModule {}
