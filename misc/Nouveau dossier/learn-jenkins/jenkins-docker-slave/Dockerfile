FROM ubuntu:18.04

USER root

# Set environment variables for the HTTP proxy
ARG HTTP_PROXY=http://10.49.98.4:8080
ARG HTTPS_PROXY=$HTTP_PROXY
ARG NO_PROXY=localhost,127.0.0.1,localhost.localdomain,10.49.98.4

# Set the environment variables for the ubuntu package manager
ENV http_proxy=$HTTP_PROXY
ENV https_proxy=$HTTPS_PROXY
ENV no_proxy=$NO_PROXY

# Install docker CLI
RUN apt-get update && \ 
    apt-get install -qy docker.io

# Make sure the package repository is up to date.
# NB: Using a single RUN command, will make sure a single container will be used to execute all commands below in a single environment. This is a recommended approach
RUN apt-get update && \
    apt-get install -qy git && \
# Install a basic SSH server
    apt-get install -qy openssh-server && \
    sed -i 's|session    required     pam_loginuid.so|session    optional     pam_loginuid.so|g' /etc/pam.d/sshd && \
    mkdir -p /var/run/sshd && \
# Install JDK 17
    apt-get install -qy openjdk-17-jdk && \
# Install maven
    apt-get install -qy maven && \
# Cleanup old packages
    apt-get -qy autoremove && \
# Add user jenkins to the image
    adduser --quiet jenkins && \
# Set password for the jenkins user (you may want to alter this).
    echo "jenkins:jenkins" | chpasswd && \
    mkdir /home/jenkins/.m2

# Copy authorized keys
COPY .ssh/authorized_keys /home/jenkins/.ssh/authorized_keys

RUN chown -R jenkins:jenkins /home/jenkins/.m2/ && \
    chown -R jenkins:jenkins /home/jenkins/.ssh/

# Standard SSH port
EXPOSE 22

# Add a VOLUME statement for /var/run/docker.sock
# VOLUME ["/var/run/docker.sock"]

# Run the Docker daemon in the background
# Change the user to jenkins and set the appropriate permissions for the Docker socket
# RUN groupadd --gid 1000 docker && usermod -aG docker jenkins && chmod 660 /var/run/docker.sock
# RUN usermod -aG docker jenkins && chmod 660 /var/run/docker.sock

CMD ["/usr/sbin/sshd", "-D"]
