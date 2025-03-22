package ee.assignment.backend.criteria;

import ee.assignment.backend.enums.LegSpace;
import ee.assignment.backend.enums.SeatClass;
import ee.assignment.backend.enums.SeatPlace;
import lombok.Data;

@Data
public class SeatSearchCriteria {
    private Long flightId;
    private SeatPlace place;
    private LegSpace legSpace;
    private SeatClass seatClass;
    private Boolean nextToExit;
}
