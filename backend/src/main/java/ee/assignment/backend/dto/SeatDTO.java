package ee.assignment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class SeatDTO {

    private Long id;
    private int number;
    private boolean isAvailable;
    private String place;
    private Long flight;
}
