package ee.assignment.backend.controller;

import ee.assignment.backend.dto.auth.LoginRequestDTO;
import ee.assignment.backend.dto.auth.LoginResponseDTO;
import ee.assignment.backend.dto.auth.RegisterRequestDTO;
import ee.assignment.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/client")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public LoginResponseDTO register(@RequestBody RegisterRequestDTO registerRequest) {
        return authService.register(registerRequest);
    }
}
