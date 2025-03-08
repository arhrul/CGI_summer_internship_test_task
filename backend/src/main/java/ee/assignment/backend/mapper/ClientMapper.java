package ee.assignment.backend.mapper;

import ee.assignment.backend.dto.ClientDTO;
import ee.assignment.backend.dto.auth.RegisterRequestDTO;
import ee.assignment.backend.model.Client;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClientMapper {
    ClientDTO toClientDTO(Client client);
    Client toClient(ClientDTO clientDTO);
    Client toClient(RegisterRequestDTO registerRequestDTO);
    List<ClientDTO> toClientDTOList(List<Client> clientList);
}
