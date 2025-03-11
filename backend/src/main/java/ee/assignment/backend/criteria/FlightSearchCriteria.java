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
    private final Optional<String> sortDirection;
}
