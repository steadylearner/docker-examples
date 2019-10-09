#  Curl, Vim, Node and Yarn
FROM steadylearner/ubuntu_node

WORKDIR /app

COPY . /app

# install node_modules
RUN yarn

EXPOSE 8000
EXPOSE 50050

CMD ["yarn", "serve"]
