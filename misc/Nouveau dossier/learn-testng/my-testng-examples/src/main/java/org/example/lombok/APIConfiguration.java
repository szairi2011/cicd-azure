package org.example.lombok;

import lombok.Builder;
import lombok.ToString;

@ToString()
@Builder()
public class APIConfiguration {

    private String host;
    private int port;
    private boolean useHttps;

    private long connectTimeout;
    private long readTimeout;

    private String username;
    private String password;
}
