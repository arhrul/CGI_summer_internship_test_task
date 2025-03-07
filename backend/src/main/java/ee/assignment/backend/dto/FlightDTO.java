package ee.assignment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class FlightDTO {

    private Long id;
    private String departure;
    private String destination;
    private LocalDateTime departureTime;
    private int duration;
    private String status;
    private List<Long> seatIds;
}
