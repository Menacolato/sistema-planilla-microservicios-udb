package sv.edu.udb.service;

import sv.edu.udb.dto.request.LoginRequest;
import sv.edu.udb.dto.response.JwtResponse;

public interface IAuthService {
    
    JwtResponse login(LoginRequest loginRequest);
}