FROM node:18-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
CMD ["npm", "start"]

# docker build -t storyteller-web .
# docker run -d -p 3000:3000 storyteller-web