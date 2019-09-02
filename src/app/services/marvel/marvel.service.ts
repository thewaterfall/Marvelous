import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {CharacterDataWrapper} from "../../models/character/CharacterDataWrapper";
import {Order} from "../../models/Order";
import ORDER_TYPE = Order.ORDER_TYPE;
import {environment} from "../../../environments/environment";

@Injectable()
export class MarvelService {
  private BASE_URL = `${environment.marvep_api_baseurl}/characters`;

  private PAGE_LIMIT = 25;

  constructor(private http: HttpClient) {
  }

  getRequiredParams(): HttpParams {
    let timestamp = new Date().getTime();
    let hash = CryptoJS.MD5(timestamp + environment.marvel_private_apikey + environment.marvel_public_apikey)
      .toString(CryptoJS.enc.Hex);

    let params = new HttpParams().set("ts", timestamp.toString()).set("apikey", environment.marvel_public_apikey).set("hash", hash);

    return params;
  }

  applyOrder(order: Order, params: HttpParams): HttpParams {
    let orderType: ORDER_TYPE = order.orderType;

    if(orderType == ORDER_TYPE.ASCENDING) {
      return params.set("orderBy", "name");
    } else if(orderType == ORDER_TYPE.DESCENDING) {
      return params.set("orderBy", "-name");
    } else {
      return params;
    }
  }

  getCharacters(page: number, order?: Order): Observable<CharacterDataWrapper> {
    let offset = this.PAGE_LIMIT * (page-1);

    let url: string = `${this.BASE_URL}`;
    let params = this.getRequiredParams().set("limit", this.PAGE_LIMIT.toString()).set("offset", offset.toString());
    params = this.applyOrder(order, params);

    return this.http.get<CharacterDataWrapper>(url, {params});
  }

  getCharactersNameStartsWith(page: number, name: string, order?: Order) {
    let offset = this.PAGE_LIMIT * (page-1);

    let url: string = `${this.BASE_URL}`;
    let params = this.getRequiredParams().set("limit", this.PAGE_LIMIT.toString()).set("offset", offset.toString()).set("nameStartsWith", name);
    params = this.applyOrder(order, params);

    return this.http.get<CharacterDataWrapper>(url, {params});
  }

}
