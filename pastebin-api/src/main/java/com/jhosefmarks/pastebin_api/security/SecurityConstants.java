package com.jhosefmarks.pastebin_api.security;

import javax.crypto.SecretKey;

import com.jhosefmarks.pastebin_api.SpringApplicationContext;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class SecurityConstants {
  public static final long EXPIRATION_DATE = 864000000;// 10 dias
  public static final String TOKEN_PREFIX = "Bearer ";
  public static final String HEADER_STRING = "Authorization";
  public static final String SIGN_UP_URL = "/users";
  // public static final String TOKEN_SECRET = "88075161f63449a39dcb62451a38259e88075161f63449a3dcb62451a38259e";


  public static SecretKey getTokenSecret() {
    AppProperties appProperties = (AppProperties) SpringApplicationContext.getBean("AppProperties");
    byte[] secret = Decoders.BASE64URL.decode(appProperties.getTokenSecret());

    return Keys.hmacShaKeyFor(secret);
  }
}
