# Use an Alpine Linux base image
FROM alpine:3.15

# Set environment variables for the HTTP proxy
ARG HTTP_PROXY=http://10.49.98.4:8080
ARG HTTPS_PROXY=$HTTP_PROXY
ARG NO_PROXY=localhost,127.0.0.1,localhost.localdomain,10.49.98.4

# Set the environment variables for the package manager
ENV http_proxy=$HTTP_PROXY
ENV https_proxy=$HTTPS_PROXY
ENV no_proxy=$NO_PROXY

# Update the package index
RUN apk update

# Install OpenSSH server (SSHD)
RUN apk add --no-cache openssh-server

# Install Java 17
# RUN wget --quiet https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz -O /jdk.tar.gz
# RUN mkdir -p /usr/local/jdk
# RUN tar -C /usr/local/jdk -xzf /jdk.tar.gz
# ENV JAVA_HOME=/usr/local/jdk/jdk-17
# ENV PATH=:/bin
# Install Java 11
RUN apk add --no-cache openjdk17-jdk

# Install Maven
RUN apk add --no-cache maven

# Install Git
RUN apk add --no-cache git

# Expose the SSH port
EXPOSE 22

# Create a user, i.e. username = jenkins with password authentication, i.e. pwd = jenkins
# RUN adduser --disabled-password-expiration --gecos "" jenkins
RUN adduser --disabled-password --gecos "" jenkins
RUN echo "jenkins:jenkins" | chpasswd

# Configure SSH to allow password authentication
RUN sed -i 's/^#PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Install and configure OpenRC; it contains rc-service to start the sshd service
RUN apk add --no-cache openrc

RUN mkdir -p /run/openrc \
&& touch /run/openrc/softlevel

# Start the SSH service
# RUN systemctl restart ssh
# RUN rc-service sshd start

# Run SSHD as a daemon at startup
# CMD ["/usr/bin/sshd", "-D"]
# CMD ["/usr/bin/sshd", "-D"]
ENTRYPOINT ["sh", "-c", "rc-status; rc-service sshd start"]

# Add handy commands to display the versions of Java, Git, SSH, and Maven
RUN java -version
RUN git --version
# RUN ssh -V
RUN mvn -v

# Running dcker command below worked for the current env:
# > $ docker build --progress=plain -t soulou2000/java-jenkins-agent:latest .