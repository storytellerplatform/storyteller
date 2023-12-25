# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json /app/
# RUN npm install
# COPY . /app/
# CMD ["npm", "start"]

FROM node:lts as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest as release
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

# docker build -t storyteller-web .
# docker run -d -p 3000:3000 storyteller-web