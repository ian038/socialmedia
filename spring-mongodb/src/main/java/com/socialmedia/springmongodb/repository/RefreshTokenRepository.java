package com.socialmedia.springmongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.socialmedia.springmongodb.model.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, Long>{
    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(String token);
}
