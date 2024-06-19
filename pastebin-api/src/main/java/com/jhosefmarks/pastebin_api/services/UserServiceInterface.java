package com.jhosefmarks.pastebin_api.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.jhosefmarks.pastebin_api.shared.dto.PostDto;
import com.jhosefmarks.pastebin_api.shared.dto.UserDto;

public interface UserServiceInterface  extends UserDetailsService {
  public UserDto createUser(UserDto user);
  public UserDto getUser(String email);
  public List<PostDto> getUserPosts(String email);
}
