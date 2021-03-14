import { Injectable } from '@angular/core';
import { HttpCallback, ErrorCallback } from './httpHelper/http-helper-types'
import { HttpHelper } from './httpHelper/http-helper'
import { ErrorModel } from 'src/app/module/shared/models/errorModel'
import { GraphModel } from '../module/home/model/graphModel';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private _: HttpHelper) { }

  getGraphData(res: HttpCallback<GraphModel>, error: ErrorCallback<ErrorModel>, date:string) {
    this._.api(`log?date=${date}`)
      .getJson()
      .unauthorized()
      .get(res, error)
  }
}
