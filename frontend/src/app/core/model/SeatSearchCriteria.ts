import {SeatPlace} from '../enums/SeatPlace';
import {LegSpace} from '../enums/LegSpace';
import {SeatClass} from '../enums/SeatClass';

export interface SeatSearchCriteria {
  flightId: number
  place: SeatPlace
  legSpace: LegSpace
  seatClass: SeatClass
}
