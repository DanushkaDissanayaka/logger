import { Injectable } from '@angular/core';
import { HttpCallback, ErrorCallback } from './httpHelper/http-helper-types'
import { HttpHelper } from './httpHelper/http-helper'

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private _: HttpHelper) { }

  getCompanys(res: HttpCallback<Array<NameIdModel>>, error: ErrorCallback<ErrorModel>) {
    this._.api("Common/companys")
      .getJson()
      .unauthorized()
      .get(res, error)
  }
}

export class NameIdModel{
  name!: string;
  id!:string
}

export class ErrorModel {
  message!: string;
}
