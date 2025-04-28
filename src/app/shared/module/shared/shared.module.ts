import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutoFocusModule } from 'primeng/autofocus';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    NgxSpinnerModule,
    AutoFocusModule,
    InputTextModule,
    RippleModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    NgxSpinnerModule,
    AutoFocusModule,
    InputTextModule,
    RippleModule,
    FormsModule
  ],
})
export class SharedModule { }
