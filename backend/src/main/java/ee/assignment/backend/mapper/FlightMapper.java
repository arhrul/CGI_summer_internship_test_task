package ee.assignment.backend.mapper;

import ee.assignment.backend.dto.FlightDTO;
import ee.assignment.backend.model.Flight;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FlightMapper {
    FlightDTO toFlightDTO(Flight flight);
    Flight toFlight(FlightDTO flightDTO);
    List<FlightDTO> toFlightDTO(List<Flight> flights);
}
