package ee.assignment.backend.controller;

import ee.assignment.backend.criteria.FlightSearchCriteria;
import ee.assignment.backend.dto.FlightDTO;
import ee.assignment.backend.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/flight")
public class FlightController {

    private static final Logger log = LoggerFactory.getLogger(FlightController.class);
    private final FlightService flightService;

    @PostMapping
    public ResponseEntity<FlightDTO> createFlight(@RequestBody FlightDTO flightDTO) {
        FlightDTO createdFlight = flightService.createFlight(flightDTO);
        return ResponseEntity.ok(createdFlight);
    }

    @GetMapping
    public ResponseEntity<List<FlightDTO>> getFlights() {
        List<FlightDTO> flights = flightService.getAllFlightsDTO();
        return ResponseEntity.ok(flights);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlight(@PathVariable Long id) {
        FlightDTO flight = flightService.getFlight(id);
        return ResponseEntity.ok(flight);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FlightDTO>> getFlightsBySearch(@ModelAttribute FlightSearchCriteria criteria) {
        log.info("getFlightsBySearch criteria: {}", criteria);
        List<FlightDTO> rooms = flightService.getAllFlights(criteria);
        return ResponseEntity.ok(rooms);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlightDTO> updateFlight(@PathVariable Long id, @RequestBody FlightDTO flightDTO) {
        FlightDTO updatedFlight = flightService.updateFlight(id, flightDTO);
        return ResponseEntity.ok(updatedFlight);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FlightDTO> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
}
