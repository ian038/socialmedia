package com.socialmedia.springmongodb.service;

import java.time.Instant;
import java.util.Date;

import com.socialmedia.springmongodb.Auth.JwtProvider;
import com.socialmedia.springmongodb.dto.AuthResponse;
import com.socialmedia.springmongodb.dto.RefreshTokenRequest;
import com.socialmedia.springmongodb.dto.SigninRequest;
import com.socialmedia.springmongodb.dto.SignupRequest;
import com.socialmedia.springmongodb.model.User;
import com.socialmedia.springmongodb.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
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

    @Autowired
    private RefreshTokenService refreshTokenService;
    
    public void signup(SignupRequest signupRequest) {
        User user = new User();

        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(signupRequest.getPassword()));
        user.setSalt(BCrypt.gensalt(10));
        user.setCreated(new Date());

        userRepository.save(user);
    }

    public AuthResponse signin(SigninRequest signinRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String token = jwtProvider.generateToken(authenticate);
        return AuthResponse.builder()
                           .authenticationToken(token)
                           .refreshToken(refreshTokenService.generateRefreshToken().getToken())
                           .expiration(Instant.now().plusMillis(jwtProvider.getJwtExpiration()))
                           .username(signinRequest.getUsername())
                           .build();
    }

    public AuthResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
        String token = jwtProvider.generateTokenWithUsername(refreshTokenRequest.getUsername());
        return AuthResponse.builder()
                           .authenticationToken(token)
                           .refreshToken(refreshTokenRequest.getRefreshToken())
                           .expiration(Instant.now().plusMillis(jwtProvider.getJwtExpiration()))
                           .username(refreshTokenRequest.getUsername())
                           .build();
    }
}
