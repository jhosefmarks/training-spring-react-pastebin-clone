package com.jhosefmarks.pastebin_api.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "exposures")
public class ExposureEntity implements Serializable {

  @Id
  @GeneratedValue
  private long id;

  @Column(nullable = false, length = 50)
  private String type;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "exposure")
  private List<PostEntity> posts = new ArrayList<>();

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public List<PostEntity> getPosts() {
    return posts;
  }

  public void setPosts(List<PostEntity> posts) {
    this.posts = posts;
  }

}
