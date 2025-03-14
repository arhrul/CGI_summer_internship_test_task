package ee.assignment.backend.dto;

import ee.assignment.backend.enums.FlightStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class FlightDTO {

    private Long id;
    private String departure;
    private String destination;
    private LocalDateTime departureTime;
    private int duration;
    private FlightStatus status;
    private double price;
}
