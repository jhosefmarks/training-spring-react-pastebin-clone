package com.jhosefmarks.pastebin_api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jhosefmarks.pastebin_api.entities.PostEntity;
import com.jhosefmarks.pastebin_api.entities.UserEntity;
import com.jhosefmarks.pastebin_api.exceptions.EmailExistsException;
import com.jhosefmarks.pastebin_api.repositories.PostRepository;
import com.jhosefmarks.pastebin_api.repositories.UserRepository;
import com.jhosefmarks.pastebin_api.shared.dto.PostDto;
import com.jhosefmarks.pastebin_api.shared.dto.UserDto;

@Service
public class UserService implements UserServiceInterface {

  @Autowired
  UserRepository userRepository;

  @Autowired
  PostRepository postRepository;

  @Autowired
  BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  ModelMapper mapper;

  @Override
  public UserDto createUser(UserDto user) {
    UserEntity userEntity = new UserEntity();
    UserDto userToReturn = new UserDto();

    if (userRepository.findByEmail(user.getEmail()) != null) {
      throw new EmailExistsException("E-mail já está em uso");
    }

    BeanUtils.copyProperties(user, userEntity);

    userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));

    UUID userId = UUID.randomUUID();
    userEntity.setUserId(userId.toString());

    UserEntity storedUserDetails = userRepository.save(userEntity);

    BeanUtils.copyProperties(storedUserDetails, userToReturn);

    return userToReturn;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    UserEntity userEntity = this.userRepository.findByEmail(email);

    if (userEntity == null) {
      throw new UsernameNotFoundException(email);
      // throw new UsernameNotFoundException("Dados de login inválidos");
    }

    return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), new ArrayList<>());
  }

  @Override
  public UserDto getUser(String email) {
    UserEntity userEntity = userRepository.findByEmail(email);

    if (userEntity == null) {
      throw new UsernameNotFoundException(email);
      }

    UserDto userToReturn = new UserDto();
    BeanUtils.copyProperties(userEntity, userToReturn);

    return userToReturn;
  }

  @Override
  public List<PostDto> getUserPosts(String email) {
    UserEntity userEntity = userRepository.findByEmail(email);

    List<PostEntity> posts = postRepository.getByUserIdOrderByCreatedAtDesc(userEntity.getId());

    List<PostDto> postDtos = new ArrayList<>();

    for (PostEntity post : posts) {
      PostDto postDto = mapper.map(post, PostDto.class);
      postDtos.add(postDto);
    }

    return postDtos;
  }

}
