import {Order} from "./Order";
import ORDER_TYPE = Order.ORDER_TYPE;

export class Filter {
  private _value: string;

  private _orders: Order[];
  private _chosenOrder: Order;

  constructor() {
    let ascOrder = new Order(ORDER_TYPE.ASCENDING);
    let descOrder = new Order(ORDER_TYPE.DESCENDING);

    this._orders = [];
    this._orders.push(ascOrder);
    this._orders.push(descOrder);

    this.chosenOrder = ascOrder;

    this._value = '';
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get orders(): Order[] {
    return this._orders;
  }

  set orders(value: Order[]) {
    this._orders = value;
  }

  get chosenOrder(): Order {
    return this._chosenOrder;
  }

  set chosenOrder(value: Order) {
    this._chosenOrder = value;
  }
}
