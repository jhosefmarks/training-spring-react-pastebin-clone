package com.jhosefmarks.pastebin_api.services;

import java.util.List;

import com.jhosefmarks.pastebin_api.shared.dto.PostCreationDto;
import com.jhosefmarks.pastebin_api.shared.dto.PostDto;

public interface PostServiceInterface {
  public PostDto createPost(PostCreationDto post);
  public List<PostDto> getLastPosts();
  public PostDto getPost(String postId);
  public void deletePost(String postId, long userId);
  public PostDto updatePost(String postId, long userId, PostCreationDto postUpdateDto);
}
