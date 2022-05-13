#stage 1
FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm install -g @angular/cli
RUN npm run build --prod
#stage 2
#CMD [ "npm","start" ] 
CMD [ "ng","serve","--host","0.0.0.0" ]