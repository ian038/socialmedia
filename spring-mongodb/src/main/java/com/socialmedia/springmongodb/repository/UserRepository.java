package com.socialmedia.springmongodb.repository;

import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.socialmedia.springmongodb.model.User;

public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
}
