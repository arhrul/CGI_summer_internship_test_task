package ee.assignment.backend.service;

import ee.assignment.backend.dto.ClientDTO;
import ee.assignment.backend.mapper.ClientMapper;
import ee.assignment.backend.model.Client;
import ee.assignment.backend.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    public ClientDTO createClient(ClientDTO clientDTO) {
        Client client = clientMapper.toClient(clientDTO);
        Client savedClient = clientRepository.save(client);
        return clientMapper.toClientDTO(savedClient);
    }

    public Client getClientById(Long id) {
        return clientRepository.findById(id).orElse(null);
    }

    public ClientDTO getClient(Long id) {
        Client client = getClientById(id);
        return clientMapper.toClientDTO(client);
    }

    public List<Client> getAllClientsEntity() {
        return clientRepository.findAll();
    }

    public List<ClientDTO> getAllClientsDTO() {
        List<Client> clients = getAllClientsEntity();
        return clientMapper.toClientDTOList(clients);
    }

    public ClientDTO updateClient(Long id, ClientDTO clientDTO) {
        Client client = getClientById(id);
        client.setFirstName(clientDTO.getFirstName());
        client.setLastName(clientDTO.getLastName());
        client.setEmail(clientDTO.getEmail());
        Client updatedClient = clientRepository.save(client);
        return clientMapper.toClientDTO(updatedClient);
    }

    public void deleteClient(Long id) {
        Client client = getClientById(id);
        clientRepository.delete(client);
    }
}
