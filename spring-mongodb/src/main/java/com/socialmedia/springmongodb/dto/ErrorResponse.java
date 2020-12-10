package com.socialmedia.springmongodb.dto;

public class ErrorResponse {
    private String details;

    public ErrorResponse() {
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
