package com.serviceharbor.auth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
 
public class ChangePasswordRequest {
	private String email;
	private String password;
	private String confirmPassword;
 
}
