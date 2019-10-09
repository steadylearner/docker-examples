# Relevant to docker container
FROM steadylearner/ubuntu_node

WORKDIR /app

COPY . /app

# install node_modules
RUN yarn

EXPOSE 50051

CMD ["yarn", "serve"]
