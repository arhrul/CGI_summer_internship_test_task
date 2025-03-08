package ee.assignment.backend.service;

import ee.assignment.backend.configs.JwtTokenProvider;
import ee.assignment.backend.dto.auth.LoginRequestDTO;
import ee.assignment.backend.dto.auth.LoginResponseDTO;
import ee.assignment.backend.dto.auth.RegisterRequestDTO;
import ee.assignment.backend.mapper.ClientMapper;
import ee.assignment.backend.model.Client;
import ee.assignment.backend.repository.ClientRepository;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final Validator validator;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final ClientMapper clientMapper;
    private static final long TOKEN_VALIDITY = (long) 1000 * 60 * 60 * 24 * 10;

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {
        Client client = clientRepository.findByEmail(loginRequestDTO.getEmail());

        if (client != null && passwordEncoder.matches(loginRequestDTO.getPassword(), client.getPassword())) {
            Map<String, Object> claims = new HashMap<>();
            claims.put("id", client.getId());
            claims.put("email", client.getEmail());

            String token = getToken(claims);

            LoginResponseDTO responseDTO = new LoginResponseDTO();

            responseDTO.setId(client.getId());
            responseDTO.setToken(token);
            responseDTO.setEmail(client.getEmail());

            return responseDTO;
        } else {
            throw new RuntimeException("Invalid email or password.");
        }
    }

    public LoginResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        validateRegisterRequest(registerRequestDTO);

        log.info("Registering new client with email: {}", registerRequestDTO.getEmail());

        if (clientRepository.findByEmail(registerRequestDTO.getEmail()) != null) {
            throw new RuntimeException("User with this email already exists.");
        }

        String hashedPassword = passwordEncoder.encode(registerRequestDTO.getPassword());
        registerRequestDTO.setPassword(hashedPassword);

        Client newClient = clientMapper.toClient(registerRequestDTO);


        Client savedClient = clientRepository.save(newClient);

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", newClient.getId());
        claims.put("email", newClient.getEmail());

        String token = getToken(claims);
        log.info("Claims: {}", claims);

        LoginResponseDTO responseDTO = new LoginResponseDTO();

        responseDTO.setId(savedClient.getId());
        responseDTO.setToken(token);
        responseDTO.setEmail(savedClient.getEmail());

        log.info("Client with email: {} registered successfully", savedClient.getEmail());

        return responseDTO;
    }

    public String getToken(Map<String, Object> claims) {
        return Jwts.builder()
                .setSubject("sub")
                .addClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY))
                .signWith(JwtTokenProvider.key)
                .compact();
    }

    private void validateRegisterRequest(RegisterRequestDTO requestDTO) {
        Set<ConstraintViolation<RegisterRequestDTO>> violations = validator.validate(requestDTO);
        if (!violations.isEmpty()) {
            StringBuilder errorMessages = new StringBuilder();
            for (ConstraintViolation<RegisterRequestDTO> violation : violations) {
                errorMessages.append(violation.getPropertyPath())
                        .append(": ").append(violation.getMessage()).append("\n");
            }
            throw new IllegalArgumentException("Validation failed: " + errorMessages.toString());
        }
    }
}

