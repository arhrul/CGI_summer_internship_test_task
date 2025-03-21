import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  public homePageLink = '/homepage'
  public loginLink = '/login'
  public registerLink = '/register'
  public profileLink = '/profile'
  public adminLink = '/admin'
  constructor() { }
}
