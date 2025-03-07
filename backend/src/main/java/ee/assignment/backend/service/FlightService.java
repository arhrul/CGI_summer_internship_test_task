package ee.assignment.backend.service;

import ee.assignment.backend.dto.FlightDTO;
import ee.assignment.backend.mapper.FlightMapper;
import ee.assignment.backend.model.Flight;
import ee.assignment.backend.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;
    private final FlightMapper flightMapper;

    public FlightDTO createFlight(FlightDTO flightDTO) {
        Flight flight = flightMapper.toFlight(flightDTO);
        Flight savedFlight = flightRepository.save(flight);
        return flightMapper.toFlightDTO(savedFlight);
    }

    public Flight getFlightById(Long id) {
        return flightRepository.findById(id).orElse(null);
    }

    public FlightDTO getFlight(Long id) {
        Flight flight = getFlightById(id);
        return flightMapper.toFlightDTO(flight);
    }

    public List<Flight> getAllFlightsEntity() {
        return flightRepository.findAll();
    }

    public List<FlightDTO> getAllFlightsDTO() {
        List<Flight> flights = getAllFlightsEntity();
        return flightMapper.toFlightDTO(flights);
    }

    public FlightDTO updateFlight(Long id, FlightDTO flightDTO) {
        Flight flight = getFlightById(id);
        flight.setDeparture(flightDTO.getDeparture());
        flight.setDestination(flightDTO.getDestination());
        flight.setDuration(flightDTO.getDuration());
        flight.setDepartureTime(flightDTO.getDepartureTime());
        flight.setStatus(flightDTO.getStatus());
        Flight savedFlight = flightRepository.save(flight);
        return flightMapper.toFlightDTO(savedFlight);
    }

    public void deleteFlight(Long id) {
        Flight flight = getFlightById(id);
        flightRepository.delete(flight);
    }
}
