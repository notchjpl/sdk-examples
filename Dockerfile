FROM --platform=linux/amd64 node:18-alpine3.17
WORKDIR /app
COPY package*.json .
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
EXPOSE 3001
