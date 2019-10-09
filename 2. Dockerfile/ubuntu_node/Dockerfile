# Relevant to docker container
FROM ubuntu:latest

# install curl
RUN apt-get update
RUN apt-get install --assume-yes curl

# install node and yarn with it
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install --assume-yes gcc g++ make
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install --assume-yes yarn

# install vim to edit the project easily
RUN apt install --assume-yes vim

