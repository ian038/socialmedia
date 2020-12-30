package com.socialmedia.springmongodb.service;

import java.time.Instant;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.socialmedia.springmongodb.Auth.JwtProvider;
import com.socialmedia.springmongodb.dto.AuthResponse;
import com.socialmedia.springmongodb.dto.ErrorResponse;
import com.socialmedia.springmongodb.dto.SignUpSuccessResponse;
import com.socialmedia.springmongodb.dto.SigninRequest;
import com.socialmedia.springmongodb.dto.SignupRequest;
import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.socialmedia.springmongodb.model.User;
import com.socialmedia.springmongodb.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;
    
    public ResponseEntity<Object> signup(SignupRequest signupRequest) {
		if (userRepository.existsByEmail(signupRequest.getEmail())) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setDetails("Email is already in use!");
			return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
		}
        User user = new User();
        // String role = signupRequest.getRole();        
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(signupRequest.getPassword()));
        user.setSalt(BCrypt.gensalt(10));
        user.setCreated(new Date());
        userRepository.save(user);

        SignUpSuccessResponse signUpSuccessResponse = new SignUpSuccessResponse();
        signUpSuccessResponse.setSuccess("Sign up successful");
        return new ResponseEntity<>(signUpSuccessResponse, HttpStatus.OK);
    }

    public ResponseEntity<Object> signin(SigninRequest signinRequest) {
        User user = userRepository.findByUsername(signinRequest.getUsername()).orElseThrow(()->new SpringSocialMediaException("Username: " + signinRequest.getUsername() + " Not Found!"));
        BCryptPasswordEncoder b = new BCryptPasswordEncoder();
        Boolean result = b.matches(signinRequest.getPassword(), user.getPassword());
        if(result == false) {
            ErrorResponse errorResponse = new ErrorResponse();
            errorResponse.setDetails("Password is incorrect!");
            return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
        } 
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getId(), signinRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setAuthenticationToken(token);
        authResponse.setUserId(user.getId());
        authResponse.setUsername(signinRequest.getUsername());
        authResponse.setUserEmail(user.getEmail());
        authResponse.setExpiration(Instant.now().plusMillis(jwtProvider.getJwtExpiration()));
        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    public ResponseEntity<String> signOut(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return new ResponseEntity<>("Signout success!", HttpStatus.OK);
    }
}
