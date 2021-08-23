import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../service/firebase.service';
import { take, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth:FirebaseService,
    private router:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user$.pipe(
      take(1),
      map(user => user?true:false),
      tap(isloggedIn=>{
        if(!isloggedIn)
  {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
        
      })
    );
  }
  
}
