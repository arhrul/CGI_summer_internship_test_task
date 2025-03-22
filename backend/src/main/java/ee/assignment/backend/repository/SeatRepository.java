package ee.assignment.backend.repository;

import ee.assignment.backend.model.Client;
import ee.assignment.backend.model.Flight;
import ee.assignment.backend.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByFlight(Flight flight);
    List<Seat> findByClient(Client client);
}
