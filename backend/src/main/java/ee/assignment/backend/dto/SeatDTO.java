package ee.assignment.backend.dto;

import ee.assignment.backend.enums.LegSpace;
import ee.assignment.backend.enums.SeatClass;
import ee.assignment.backend.enums.SeatPlace;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SeatDTO {

    private Long id;
    private int number;
    private Boolean isAvailable;
    private SeatPlace place;
    private LegSpace legSpace;
    private SeatClass seatClass;
    private double price;
    private Long flightId;
    private Long clientId;
}
