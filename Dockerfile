# Extending image
FROM node:carbon as build

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get -y install autoconf automake libtool libusb-1.0-0 libusb-1.0-0-dev nasm make pkg-config git apt-utils nginx

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Versions
RUN npm -v
RUN node -v

# Install app dependencies
COPY package.json /usr/src/app/
COPY . /usr/src/app/
#COPY yarn.lock /usr/src/app/

RUN npm install 

RUN npm install react-scripts

# Port to listener
EXPOSE 80 

# Environment variables
ARG isDev 
RUN if [ "${isDev}" = "1" ] ; then mv /usr/src/app/.env.development /usr/src/app/.env ; else mv /usr/src/app/.env.production /usr/src/app/.env ; fi
RUN if [ "${isDev}" = "1" ] ; then rm /usr/src/app/.env.production ; else rm /usr/src/app/.env.development ; fi
RUN cat /usr/src/app/.env
ENV APP_ENV development 
ENV PORT 80 
ENV PUBLIC_PATH "/"

RUN npm run build

FROM nginx:1.13.12-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
