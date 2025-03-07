package ee.assignment.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Flight {

    @Id
    private Long id;

    @Column(nullable = false)
    private String departure;

    @Column(nullable = false)
    private String destination;

    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private int duration;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "flight")
    @Column(nullable = false)
    private List<Seat> seats;
}
