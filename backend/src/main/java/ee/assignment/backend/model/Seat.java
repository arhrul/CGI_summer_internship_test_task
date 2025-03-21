package ee.assignment.backend.model;

import ee.assignment.backend.enums.LegSpace;
import ee.assignment.backend.enums.SeatClass;
import ee.assignment.backend.enums.SeatPlace;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int number;

    @Column()
    private Boolean isAvailable;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatPlace place;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LegSpace legSpace;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatClass seatClass;

    @Column(nullable = false)
    private double price;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "flight_id")
    private Flight flight;
}
