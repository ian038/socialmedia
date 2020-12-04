package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.*;

import com.socialmedia.springmongodb.dto.AuthResponse;
import com.socialmedia.springmongodb.dto.RefreshTokenRequest;
import com.socialmedia.springmongodb.dto.SigninRequest;
import com.socialmedia.springmongodb.dto.SignupRequest;
import com.socialmedia.springmongodb.service.AuthService;
import com.socialmedia.springmongodb.service.RefreshTokenService;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest signupRequest) {
        authService.signup(signupRequest);
        return new ResponseEntity<>("Sign up successful", HttpStatus.OK);
    }

    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody SigninRequest signinRequest) {
        return authService.signin(signinRequest);
    }

    @PostMapping("/refresh/token") 
    public AuthResponse refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping("/signout") 
    public ResponseEntity<String> signout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
        return new ResponseEntity<>("Refresh token deleted successfully!", HttpStatus.OK);
    }
}
