package ee.assignment.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Seat {

    @Id
    private Long id;

    @Column(nullable = false)
    private int number;

    @Column(nullable = false)
    private boolean isAvailable;

    @Column(nullable = false)
    private String place;

    @ManyToOne
    @Column(nullable = false)
    private Flight flight;
}
