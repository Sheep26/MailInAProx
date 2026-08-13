FROM node:lts-alpine
WORKDIR /app
COPY . .
EXPOSE 8080
RUN npm install
CMD ["npm", "run", "start"]