package com.socialmedia.springmongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.socialmedia.springmongodb.model.Comment;

public interface CommentRepository extends MongoRepository<Comment, String>{
}
