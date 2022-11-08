FROM node:18-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY ["package.json", "yarn.lock*", "./"]
RUN yarn install --production
COPY . .

EXPOSE 3001
CMD [ "node", "src/main.js" ]