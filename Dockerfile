FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /home

# Copy tests
COPY ./tests ./tests

# Copy package.json
COPY package.json ./package.json

# Install dependencies
RUN yarn install

# Copy playwright config
COPY playwright.config.ts ./playwright.config.ts

# Copy tsconfig
COPY tsconfig.json ./tsconfig.json

# Copy src
COPY src ./src

# Expose ports
EXPOSE 5335
EXPOSE 80

# Set IS_DOCKER env variable
ENV IS_DOCKER=true

# Set the volume for screenshots
VOLUME /home/tests/screenshots

# Run tests 
CMD ["yarn", "test", "--update-snapshots"]