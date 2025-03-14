import {FlightStatus} from '../enums/FlightStatus';

export interface Flight {
  id: number;
  departure: string;
  destination: string;
  departureTime: Date;
  duration: number;
  status: FlightStatus;
  price: number;

}
