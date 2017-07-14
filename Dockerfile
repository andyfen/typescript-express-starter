FROM node:8.0.0
ADD . /
RUN npm install --ignore-scripts
CMD node dist/server.js
