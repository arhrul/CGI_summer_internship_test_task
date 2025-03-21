package ee.assignment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ClientDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
