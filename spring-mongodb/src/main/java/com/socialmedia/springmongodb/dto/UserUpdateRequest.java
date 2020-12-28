package com.socialmedia.springmongodb.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class UserUpdateRequest {
    private String username;
    private String email;
    private String password;

    public UserUpdateRequest() {
    }

    @NotNull(message = "Username cannot be empty")
    public String getUsername() {
        return username;
    }
    
    @Pattern(regexp = "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$", message = "Email must be valid")
    public String getEmail() {
        return email;
    }

    @NotNull(message = "Pssword cannot be empty")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Za-z])(?=\\S+$).{8,}$", message = "Password must be 8 characters long and contain at least one digit")
    public String getPassword() {
        return password;
    }
}
