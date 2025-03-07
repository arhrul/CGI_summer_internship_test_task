package ee.assignment.backend.mapper;

import ee.assignment.backend.dto.SeatDTO;
import ee.assignment.backend.model.Seat;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SeatMapper {
    SeatDTO toSeatDTO(Seat seat);
    Seat toSeat(SeatDTO seatDTO);
    List<SeatDTO> toSeatDTOList(List<Seat> seats);
}
