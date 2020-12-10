package com.socialmedia.springmongodb.Auth;

import java.io.*;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.time.Instant;
import java.util.Date;

import javax.annotation.PostConstruct;

import com.socialmedia.springmongodb.exception.SpringSocialMediaException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import static java.util.Date.from;

@Service
public class JwtProvider {

    private KeyStore keyStore;

    @Value("${jwt.expiration.time}")
    private Long jwtExpirationInMillis;

    @PostConstruct
    public void init() {
        try {
            keyStore = KeyStore.getInstance("JKS");
            InputStream resourceAsStream = getClass().getResourceAsStream("/springblog.jks");
            keyStore.load(resourceAsStream, "secret".toCharArray());
        } catch(KeyStoreException | CertificateException | NoSuchAlgorithmException | IOException e) {
            throw new SpringSocialMediaException("Exception occured while loading keystore");
        }
    }

    public String generateToken(Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        return Jwts.builder()
                   .setSubject(principal.getUsername())
                   .setIssuedAt(from(Instant.now()))
                   .signWith(getPrivateKey())
                   .setExpiration(Date.from(Instant.now().plusMillis(jwtExpirationInMillis)))
                   .compact();
    }

    private PrivateKey getPrivateKey() {
        try {   
            return (PrivateKey) keyStore.getKey("springblog", "secret".toCharArray()); 
        } catch(KeyStoreException | NoSuchAlgorithmException | UnrecoverableKeyException e) {
            throw new SpringSocialMediaException("Exception occured while retrieving public key from keystore");
        }
    } 

    public Boolean validateToken(String jwt) {
        Jwts.parserBuilder().setSigningKey(getPublicKey()).build().parseClaimsJws(jwt);
        return true;
    }

    private PublicKey getPublicKey() {
        try {
            return keyStore.getCertificate("springblog").getPublicKey();
        } catch (KeyStoreException e) {
            throw new SpringSocialMediaException("Exception occured while " + "retrieving public key from keystore");
        }
    }

    public String getUsernameFromJwt(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(getPublicKey()).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public Long getJwtExpiration() {
        return jwtExpirationInMillis;
    }
}
