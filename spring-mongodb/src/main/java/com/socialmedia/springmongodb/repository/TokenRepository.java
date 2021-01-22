package com.socialmedia.springmongodb.repository;

import com.socialmedia.springmongodb.model.PasswordResetToken;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TokenRepository extends MongoRepository<PasswordResetToken, String> {
    PasswordResetToken findByToken(String token);
    Boolean existsByToken(String token);
}
