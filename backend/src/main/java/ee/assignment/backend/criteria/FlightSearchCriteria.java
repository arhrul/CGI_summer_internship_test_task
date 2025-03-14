package ee.assignment.backend.criteria;

import lombok.Data;

import java.time.LocalDate;
import java.util.Optional;

@Data
public class FlightSearchCriteria {
    private String departure;
    private String destination;
    private LocalDate departureTime;
    private int numberOfPeople;
    private Integer durationStartTime;
    private Integer durationEndTime;
    private Integer departureStartTime;
    private Integer departureEndTime;
    private Double priceStart;
    private Double priceEnd;
}
