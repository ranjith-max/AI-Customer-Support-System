package com.ranjith.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.ranjith.backend.dto.LoginRequest;
import com.ranjith.backend.dto.AuthResponse;
import com.ranjith.backend.dto.RegisterRequest;
import com.ranjith.backend.service.AuthService;
@RestController
@RequestMapping("/api/auth")
public class AuthControlller {

	private final AuthService  authService;
	public AuthControlller(AuthService authService) {
		this.authService = authService;
	}
	
	@PostMapping("/register")
	public String register(@RequestBody RegisterRequest request) {
		return authService.register(request);
	}
	
	@PostMapping("/login")
	public AuthResponse login(
	        @RequestBody LoginRequest request) {

	    return authService.login(request);
	}
}
