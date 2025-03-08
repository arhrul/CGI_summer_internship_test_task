package ee.assignment.backend.mapper;

import ee.assignment.backend.dto.SeatDTO;
import ee.assignment.backend.model.Seat;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SeatMapper {

    @Mapping(source = "client.id", target = "clientId", defaultExpression = "java(null)")
    @Mapping(source = "flight.id", target = "flightId")
    SeatDTO toSeatDTO(Seat seat);

    @Mapping(source = "clientId", target = "client.id", defaultExpression = "java(null)")
    @Mapping(source = "flightId", target = "flight.id")
    Seat toSeat(SeatDTO seatDTO);
    
    List<SeatDTO> toSeatDTOList(List<Seat> seats);
}
