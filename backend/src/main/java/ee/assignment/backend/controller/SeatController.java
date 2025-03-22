package ee.assignment.backend.controller;

import ee.assignment.backend.criteria.SeatSearchCriteria;
import ee.assignment.backend.dto.SeatDTO;
import ee.assignment.backend.service.SeatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seat")
@Slf4j
public class SeatController {

    private final SeatService seatService;

    @PostMapping
    public ResponseEntity<SeatDTO> createSeat(@RequestBody SeatDTO seatDTO) {
        SeatDTO createdSeat = seatService.createSeat(seatDTO);
        return ResponseEntity.ok(createdSeat);
    }

    @PostMapping("/flight/{flightId}")
    public ResponseEntity<List<SeatDTO>> createSeatsForFlight(@PathVariable Long flightId) {
        List<SeatDTO> seats = seatService.createSeatsForFlight(flightId);
        return ResponseEntity.ok(seats);
    }

    @GetMapping
    public ResponseEntity<List<SeatDTO>> getSeats() {
        List<SeatDTO> seats = seatService.getAllSeatsDTO();
        return ResponseEntity.ok(seats);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeatDTO> getSeat(@PathVariable Long id) {
        SeatDTO seat = seatService.getSeat(id);
        return ResponseEntity.ok(seat);
    }

    @GetMapping("/flight/{flightId}")
    public ResponseEntity<List<SeatDTO>> getSeatsByFlightId(@PathVariable Long flightId) {
        List<SeatDTO> seats = seatService.getSeatsByFlightId(flightId);
        return ResponseEntity.ok(seats);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<SeatDTO>> getSeatsByClientId(@PathVariable Long clientId) {
        List<SeatDTO> seats = seatService.getSeatsByClientId(clientId);
        return ResponseEntity.ok(seats);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatDTO> updateSeat(@PathVariable Long id, @RequestBody SeatDTO seatDTO) {
        SeatDTO updatedSeat = seatService.updateSeat(id, seatDTO);
        return ResponseEntity.ok(updatedSeat);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSeat(@PathVariable Long id) {
        seatService.deleteSeat(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<SeatDTO>> searchSeats(@ModelAttribute SeatSearchCriteria criteria) {
        log.info("getSeatsBySearch criteria: {}", criteria);
        List<SeatDTO> seats = seatService.searchSeats(criteria);
        return ResponseEntity.ok(seats);
    }
}
