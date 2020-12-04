package com.socialmedia.springmongodb.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class SignupRequest {
    @NotNull(message = "Username cannot be empty")
    private String username;

    @NotNull(message = "Email cannot be empty")
    
    @Pattern(regexp = "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$", message = "Email must be valid")
    private String email;

    private String role;

    @NotNull(message = "Pssword cannot be empty")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[A-Za-z])(?=\\S+$).{8,}$", message = "Password must be 8 characters long and contain at least one digit")
    private String password;

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

//     public String getRole() {
//         return role;
//       }
      
//     public void setRole(String role) {
//         this.role = role;
//   }
}
