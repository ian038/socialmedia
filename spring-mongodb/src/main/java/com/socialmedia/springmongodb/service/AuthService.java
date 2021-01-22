package com.socialmedia.springmongodb.service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;
import java.util.Locale;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.MessageSource;
import com.socialmedia.springmongodb.Auth.JwtProvider;
import com.socialmedia.springmongodb.dto.AuthResponse;
import com.socialmedia.springmongodb.dto.ErrorResponse;
import com.socialmedia.springmongodb.dto.SignUpSuccessResponse;
import com.socialmedia.springmongodb.dto.SigninRequest;
import com.socialmedia.springmongodb.dto.SignupRequest;
import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.socialmedia.springmongodb.model.User;
import com.socialmedia.springmongodb.repository.TokenRepository;
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
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.socialmedia.springmongodb.model.PasswordResetToken;

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
    private TokenRepository tokenRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MessageSource messages;

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

    public ResponseEntity<String> forgotPassword(HttpServletRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail);
        if(user == null) {
            return new ResponseEntity<>("User email does not exist. Please sign up.", HttpStatus.FORBIDDEN);
        }
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(UUID.randomUUID().toString());
        resetToken.setExpiryDate(new Date());
        tokenRepository.save(resetToken);
        HashMap<String, String> token = new HashMap<String, String>();
        token.put("id", resetToken.getId());
        token.put("token", resetToken.getToken());
        token.put("Expiry Date", resetToken.getExpiryDate().toString());

        user.setPasswordResetToken(token); 
        try {
            final String appUrl = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
            final SimpleMailMessage email = constructResetTokenEmail(appUrl, resetToken.getToken(), user);
            mailSender.send(email);
        } catch (MailAuthenticationException e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("A password reset email has been sent to you! Please check your email.", HttpStatus.OK);
    }

    // NON-API
    private SimpleMailMessage constructResetTokenEmail(final String contextPath, final String token, final User user) {
        final String url = contextPath + "/user/changepassword/" + user.getId() + "/" + token;
        final SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Reset Password");
        email.setText("Reset Password" + " \r\n" + url);
        email.setFrom("noreply@socialmediaapp.com");
        return email;
    }
}
