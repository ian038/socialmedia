package com.socialmedia.springmongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

import com.socialmedia.springmongodb.model.Post;

public interface PostRepository extends MongoRepository<Post, String>{
    @Query("{'postedBy.id': ?0}")
    List<Post> findByUserId(String userId);
} 
