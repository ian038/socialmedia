package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.*;

import com.socialmedia.springmongodb.dto.SigninRequest;
import com.socialmedia.springmongodb.dto.SignupRequest;
import com.socialmedia.springmongodb.service.AuthService;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@Valid @RequestBody SignupRequest signupRequest) {
        return authService.signup(signupRequest);
    }

    @PostMapping("/signin")
    public ResponseEntity<Object> signin(@Valid @RequestBody SigninRequest signinRequest) {
        return authService.signin(signinRequest);
    }

    @GetMapping("/signout")
    public ResponseEntity<String> signOut(HttpServletRequest request, HttpServletResponse response) {
        return authService.signOut(request, response);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(HttpServletRequest request, @Valid @RequestBody String userEmail) {
        return authService.forgotPassword(request, userEmail);
    }

    @PutMapping("/resetpassword/{userId}/{token}")
    public ResponseEntity<String> resetPassword(@PathVariable("userId") String userId, @PathVariable("token") String token, @Valid @RequestBody String newPassword) {
        return authService.resetPassword(userId, token, newPassword);
    }
}
