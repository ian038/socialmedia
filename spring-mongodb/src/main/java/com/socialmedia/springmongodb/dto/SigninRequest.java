package com.socialmedia.springmongodb.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class SigninRequest {
    @NotNull(message = "Username cannot be empty")
    private String username;

    @NotNull(message = "Pssword cannot be empty")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Za-z])(?=\\S+$).{8,}$", message = "Password must be 8 characters long and contain at least one digit")
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
