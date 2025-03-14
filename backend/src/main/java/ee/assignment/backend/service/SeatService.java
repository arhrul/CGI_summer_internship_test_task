package ee.assignment.backend.service;

import ee.assignment.backend.dto.SeatDTO;
import ee.assignment.backend.enums.LegSpace;
import ee.assignment.backend.enums.SeatClass;
import ee.assignment.backend.enums.SeatPlace;
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
    private static final double LIMITED_LEG_SPACE_COFF = 1;
    private static final double STANDARD_LEG_SPACE_COFF = 1.1;
    private static final double EXTRA_LEG_SPACE_COFF = 1.2;

    private static final double ECONOMY_CLASS_COFF = 1;
    private static final double BUSINESS_CLASS_COFF = 1.5;
    private static final double FIRST_CLASS_COFF = 2;

    private static final double WINDOW_PLACE_COFF = 1.1;
    private static final double MIDDLE_PLACE_COFF = 1;
    private static final double AISLE_PLACE_COFF = 1;

    public SeatDTO createSeat(SeatDTO seatDTO) {
        Flight flight = getFlightById(seatDTO.getFlightId());

        Seat seat = seatMapper.toSeat(seatDTO);
        LegSpace legSpace = seat.getLegSpace();
        SeatClass seatClass = seat.getSeatClass();
        SeatPlace seatPlace = seat.getPlace();
        double price = flight.getPrice();

        seat.setFlight(flight);
        seat.setIsAvailable(true);
        seat.setPrice(calculatePrice(price, legSpace, seatClass, seatPlace));
        Seat savedSeat = seatRepository.save(seat);
        return seatMapper.toSeatDTO(savedSeat);
    }

    public double calculatePrice(double standard_price,
                                 LegSpace legSpace,
                                 SeatClass seatClass, SeatPlace seatPlace) {
        double total = standard_price;
        if (legSpace == LegSpace.LIMITED) {
            total += standard_price * LIMITED_LEG_SPACE_COFF - standard_price;
        }
        else if (legSpace == LegSpace.STANDARD) {
            total += standard_price * STANDARD_LEG_SPACE_COFF - standard_price;
        }
        else if (legSpace == LegSpace.EXTRA) {
            total += standard_price * EXTRA_LEG_SPACE_COFF - standard_price;
        }

        if (seatClass == SeatClass.ECONOMY) {
            total += standard_price * ECONOMY_CLASS_COFF - standard_price;
        }
        else if (seatClass == SeatClass.BUSINESS) {
            total += standard_price * BUSINESS_CLASS_COFF - standard_price;
        }
        else if (seatClass == SeatClass.FIRST) {
            total += standard_price * FIRST_CLASS_COFF - standard_price;
        }

        if (seatPlace == SeatPlace.WINDOW) {
            total += standard_price * WINDOW_PLACE_COFF - standard_price;
        }
        else if (seatPlace == SeatPlace.MIDDLE) {
            total += standard_price * MIDDLE_PLACE_COFF - standard_price;
        }
        else if (seatPlace == SeatPlace.AISLE) {
            total += standard_price * AISLE_PLACE_COFF - standard_price;
        }
        return total;
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
        seat.setPrice(seatDTO.getPrice());
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

    public List<SeatDTO> getSeatsByFlightId(Long flightId) {
        Flight flight = getFlightById(flightId);
        List<Seat> seats = seatRepository.findByFlight(flight);
        return seatMapper.toSeatDTOList(seats);
    }
}
