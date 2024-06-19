package com.jhosefmarks.pastebin_api.entities;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity(name = "posts")
@EntityListeners(AuditingEntityListener.class)
@Table(indexes = @Index(columnList = "postId", name = "index_postid", unique = true))
public class PostEntity implements Serializable {

  @Id
  @GeneratedValue
  private long id;

  @Column(nullable = false)
  private String postId;

  @Column(nullable = false, length = 255)
  private String title;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(nullable = false)
  private Date expiresAt;

  @CreatedDate
  @Column(nullable = false)
  private Date createdAt;

  @ManyToOne
  @JoinColumn(nullable = false, name = "user_id")
  private UserEntity user;

  @ManyToOne
  @JoinColumn(nullable = false, name = "exposure_id")
  private ExposureEntity exposure;

  public long getId() {
    return this.id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getPostId() {
    return this.postId;
  }

  public void setPostId(String postId) {
    this.postId = postId;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public UserEntity getUser() {
    return this.user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  public ExposureEntity getExposure() {
    return this.exposure;
  }

  public void setExposure(ExposureEntity exposure) {
    this.exposure = exposure;
  }

  public Date getExpiresAt() {
    return this.expiresAt;
  }

  public void setExpiresAt(Date expiresAt) {
    this.expiresAt = expiresAt;
  }

  public Date getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

}
