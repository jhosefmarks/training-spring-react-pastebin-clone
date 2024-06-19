package com.jhosefmarks.pastebin_api.controllers;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jhosefmarks.pastebin_api.models.requests.PostCreateRequestModel;
import com.jhosefmarks.pastebin_api.models.responses.OperationStatusModel;
import com.jhosefmarks.pastebin_api.models.responses.PostRest;
import com.jhosefmarks.pastebin_api.services.PostServiceInterface;
import com.jhosefmarks.pastebin_api.services.UserServiceInterface;
import com.jhosefmarks.pastebin_api.shared.dto.PostCreationDto;
import com.jhosefmarks.pastebin_api.shared.dto.PostDto;
import com.jhosefmarks.pastebin_api.shared.dto.UserDto;
import com.jhosefmarks.pastebin_api.utils.Exposures;

@RestController
@RequestMapping("/posts")
public class PostController {

  @Autowired
  PostServiceInterface postService;

  @Autowired
  UserServiceInterface userService;

  @Autowired
  ModelMapper mapper;

  @PostMapping
  public PostRest createPost(@RequestBody PostCreateRequestModel createRequestModel) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    String email = authentication.getPrincipal().toString();

    PostCreationDto postCreationDto = mapper.map(createRequestModel, PostCreationDto.class);

    postCreationDto.setUserEmail(email);

    PostDto postDto = postService.createPost(postCreationDto);

    PostRest postToReturn = mapper.map(postDto, PostRest.class);

    return postToReturn;
  }

  @GetMapping(path = "/last") // localhost:8080/posts/last
  public List<PostRest> lastPosts() {
    List<PostDto> posts = postService.getLastPosts();

    List<PostRest> postRests = new ArrayList<>();

    for (PostDto post : posts) {
      PostRest postRest = mapper.map(post, PostRest.class);
      postRests.add(postRest);
    }

    return postRests;
  }

  @GetMapping(path = "/{id}") // localhost:8080/posts/uuid
  public PostRest getPost(@PathVariable String id) {
    PostDto postDto = postService.getPost(id);

    PostRest postRest = mapper.map(postDto, PostRest.class);

    if (postRest.getExposure().getId() == Exposures.PRIVATE || postRest.getExpired()) {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

      UserDto user = userService.getUser(authentication.getPrincipal().toString());

      if (user.getId() != postDto.getUser().getId()) {
        throw new RuntimeException("Não tem permissão para realizar essa ação");
      }
    }

    return postRest;
  }

  @DeleteMapping(path = "/{id}")
  public OperationStatusModel deletePost(@PathVariable String id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    UserDto user = userService.getUser(authentication.getPrincipal().toString());

    OperationStatusModel operationStatusModel = new OperationStatusModel();
    operationStatusModel.setName("DELETE");

    postService.deletePost(id, user.getId());
    operationStatusModel.setResult("SUCCESS");

    return operationStatusModel;
  }

  @PutMapping(path = "/{id}")
  public PostRest updatePost(@RequestBody PostCreateRequestModel postCreateRequestModel, @PathVariable String id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    UserDto user = userService.getUser(authentication.getPrincipal().toString());

    PostCreationDto postUpdateDto = mapper.map(postCreateRequestModel, PostCreationDto.class);

    PostDto postDto = postService.updatePost(id, user.getId(), postUpdateDto);

    PostRest updatedPost = mapper.map(postDto, PostRest.class);

    return updatedPost;
  }

}
