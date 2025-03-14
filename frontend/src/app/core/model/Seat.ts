import {SeatPlace} from '../enums/SeatPlace';
import {LegSpace} from '../enums/LegSpace';
import {SeatClass} from '../enums/SeatClass';

export interface Seat {
  id: number;
  number: number;
  isAvailable: boolean;
  place: SeatPlace;
  legSpace: LegSpace;
  seatClass: SeatClass;
  price: number;
  clientId: number;
  flightId: number;
}
