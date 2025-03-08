package ee.assignment.backend.service;

import ee.assignment.backend.dto.SeatDTO;
import ee.assignment.backend.mapper.SeatMapper;
import ee.assignment.backend.model.Client;
import ee.assignment.backend.model.Flight;
import ee.assignment.backend.model.Seat;
import ee.assignment.backend.repository.ClientRepository;
import ee.assignment.backend.repository.FlightRepository;
import ee.assignment.backend.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;
    private final ClientRepository clientRepository;
    private final FlightRepository flightRepository;
    private final SeatMapper seatMapper;

    public SeatDTO createSeat(SeatDTO seatDTO) {
        Flight flight = getFlightById(seatDTO.getFlightId());

        Seat seat = seatMapper.toSeat(seatDTO);
        seat.setFlight(flight);
        seat.setClient(null);
        seat.setIsAvailable(true);
        Seat savedSeat = seatRepository.save(seat);
        return seatMapper.toSeatDTO(savedSeat);
    }

    public Seat getSeatById(Long id) {
        return seatRepository.findById(id).orElse(null);
    }

    public SeatDTO getSeat(Long id) {
        Seat seat = getSeatById(id);
        return seatMapper.toSeatDTO(seat);
    }

    public List<Seat> getAllSeatsEntity() {
        return seatRepository.findAll();
    }

    public List<SeatDTO> getAllSeatsDTO() {
        List<Seat> seats = getAllSeatsEntity();
        return seatMapper.toSeatDTOList(seats);
    }

    public SeatDTO updateSeat(Long id, SeatDTO seatDTO) {
        Flight flight = getFlightById(seatDTO.getFlightId());
        Client client = getClientById(seatDTO.getClientId());

        Seat seat = getSeatById(id);
        seat.setNumber(seatDTO.getNumber());
        seat.setIsAvailable(seatDTO.getIsAvailable());
        seat.setPlace(seatDTO.getPlace());
        seat.setFlight(flight);
        seat.setClient(client);
        Seat updatedSeat = seatRepository.save(seat);
        return seatMapper.toSeatDTO(updatedSeat);
    }

    public void deleteSeat(Long id) {
        Seat seat = getSeatById(id);
        seatRepository.delete(seat);
    }


    public Flight getFlightById(Long id) {
        return flightRepository.findById(id).orElse(null);
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }
}
