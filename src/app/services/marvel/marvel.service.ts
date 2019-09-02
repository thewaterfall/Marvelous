import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {CharacterDataWrapper} from "../../models/character/CharacterDataWrapper";
import {Order} from "../../models/Order";
import ORDER_TYPE = Order.ORDER_TYPE;

@Injectable()
export class MarvelService {
  private BASE_URL = "https://gateway.marvel.com/v1/public";

  private PUBLIC_KEY = "cd7e3d25bf222b7e096d781186681397";
  private PRIVATE_KEY = "8d53c9b7915834ead2fbdbfff73c5a38c66ceab6";

  private PAGE_LIMIT = 25;

  constructor(private http: HttpClient) {
  }

  getRequiredParams(): HttpParams {
    let timestamp = new Date().getTime();
    let hash = CryptoJS.MD5(timestamp + this.PRIVATE_KEY + this.PUBLIC_KEY).toString(CryptoJS.enc.Hex);

    let params = new HttpParams().set("ts", timestamp.toString()).set("apikey", this.PUBLIC_KEY).set("hash", hash);

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

    let url: string = `${this.BASE_URL}/characters`;
    let params = this.getRequiredParams().set("limit", this.PAGE_LIMIT.toString()).set("offset", offset.toString());
    params = this.applyOrder(order, params);

    return this.http.get<CharacterDataWrapper>(url, {params});
  }

  getCharactersNameStartsWith(page: number, name: string, order?: Order) {
    let offset = this.PAGE_LIMIT * (page-1);

    let url: string = `${this.BASE_URL}/characters`;
    let params = this.getRequiredParams().set("limit", this.PAGE_LIMIT.toString()).set("offset", offset.toString()).set("nameStartsWith", name);
    params = this.applyOrder(order, params);

    return this.http.get<CharacterDataWrapper>(url, {params});
  }

}
