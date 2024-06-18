package com.jhosefmarks.pastebin_api.controllers;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jhosefmarks.pastebin_api.models.requests.UserDetailRequestModel;
import com.jhosefmarks.pastebin_api.models.responses.UserRest;
import com.jhosefmarks.pastebin_api.services.UserServiceInterface;
import com.jhosefmarks.pastebin_api.shared.dto.UserDto;

@RestController
@RequestMapping("/users")
public class UserController {

  @Autowired
  UserServiceInterface userService;

  @GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
  public UserRest getUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getPrincipal().toString();

    UserDto userDto = userService.getUser(email);

    UserRest userToReturn = new UserRest();

    BeanUtils.copyProperties(userDto, userToReturn);

    return userToReturn;
  }

  @PostMapping
  public UserRest createUser(@RequestBody UserDetailRequestModel userDetails) {
    UserRest userToReturn = new UserRest();
    UserDto userDto = new UserDto();

    BeanUtils.copyProperties(userDetails, userDto);

    UserDto createdUser = userService.createUser(userDto);

    BeanUtils.copyProperties(createdUser, userToReturn);

    return userToReturn;
  }

}
