import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router,  } from "@angular/router";


export const authGuard : CanActivateFn= () => {

  const router = inject(Router);

  if(localStorage.getItem('token')!= null) {
      return true;
  } else {
    router.navigate(['login']);
    return false;
  }
}
