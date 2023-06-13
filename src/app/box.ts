import { Place } from "./place";

export interface Box{
    id: string,
    placeId: string,
    customerId: number,
    orderId: number,
    packageId: number
}

export interface BoxWithPlace extends Box {
    place: Place;
  }