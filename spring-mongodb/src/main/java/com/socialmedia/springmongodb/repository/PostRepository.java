package com.socialmedia.springmongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.socialmedia.springmongodb.model.Post;

public interface PostRepository extends MongoRepository<Post, String>{

} 
