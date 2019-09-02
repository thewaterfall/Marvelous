export class Order {
  readonly orderType: Order.ORDER_TYPE;

  constructor (orderType: Order.ORDER_TYPE) {
    this.orderType = orderType;
  }
}
export namespace Order {
  export enum ORDER_TYPE { ASCENDING= "A-Z", DESCENDING = "Z-A"}
}
