#!/usr/bin/env bash

# This script is responsible to setting up files which contain confidential API keys

echo "Configuring project..."

# Initial setup
ENV=$1
GENERATION_INTERFIX="generated"
FILENAME_HTML="./src/index.${GENERATION_INTERFIX}.html"

exit_if_empty () {
  if [[ -z ${!1} ]]; then
    echo "$1 not set. Please set it and then run this script again"
    exit 1
   fi
}

if [[ ${ENV} == "dev" ]] || [[ ${ENV} == "test" ]]; then
  exit_if_empty GOOGLE_MAPS_API_KEY_DEV

  # TODO: Delete this after adding separate step for test stage
  ENV="dev"
  FILENAME_ENV="./src/environments/environment.${GENERATION_INTERFIX}.${ENV}.ts"

  sed -e "s;{{#PRODUCTION#}};false;" \
      -e "s;{{#API_ADDRESS#}};https://localhost:4000/api;" \
      -e "s;{{#GOOGLE_MAPS_API_KEY#}};$GOOGLE_MAPS_API_KEY_DEV;" \
      ./src/templates/environment.template > ${FILENAME_ENV}
  echo "Generated ${FILENAME_ENV}"

  sed -e "s;{{#GOOGLE_MAPS_API_KEY#}};$GOOGLE_MAPS_API_KEY_DEV;" \
      ./src/templates/index.html.template > ${FILENAME_HTML}
  echo "Generated ${FILENAME_HTML}"

elif [[ ${ENV} == "prod" ]]; then
  exit_if_empty GOOGLE_MAPS_API_KEY_PROD
  exit_if_empty API_ADDRESS_PROD

  FILENAME_ENV="./src/environments/environment.${GENERATION_INTERFIX}.${ENV}.ts"

  # Dev env file has to be generated to make Angular's env file replacement work
  DEV_ENV_MOCK="./src/environments/environment.${GENERATION_INTERFIX}.dev.ts"
  touch "${DEV_ENV_MOCK}"
  echo "Generated ${DEV_ENV_MOCK}"

  sed -e "s;{{#PRODUCTION#}};true;" \
      -e "s;{{#API_ADDRESS#}};$API_ADDRESS_PROD;" \
      -e "s;{{#GOOGLE_MAPS_API_KEY#}};$GOOGLE_MAPS_API_KEY_PROD;" \
      ./src/templates/environment.template > ${FILENAME_ENV}
  echo "Generated ${FILENAME_ENV}"

  sed -e "s;{{#GOOGLE_MAPS_API_KEY#}};$GOOGLE_MAPS_API_KEY_PROD;" \
      ./src/templates/index.html.template > ${FILENAME_HTML}
  echo "Generated ${FILENAME_HTML}"
fi

echo "Configuration completed"

