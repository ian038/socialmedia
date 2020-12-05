package com.socialmedia.springmongodb.repository;

import java.util.*;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.socialmedia.springmongodb.model.User;

public interface UserRepository extends MongoRepository<User, String>{
    // @Query(value="{}", fields="{_id : 1, username : 1, email : 1}")
    Optional<User> findByUsername(String username);
    Boolean existsByEmail(String email);
}
