package com.jhosefmarks.pastebin_api.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.jhosefmarks.pastebin_api.shared.dto.UserDto;

public interface UserServiceInterface  extends UserDetailsService {
  public UserDto createUser(UserDto user);
  public UserDto getUser(String email);
}
