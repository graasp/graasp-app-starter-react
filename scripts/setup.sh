#!/usr/bin/env bash

# fail the build on any failed command
set -e

usage() {
    echo "usage: $0 [-e <path/to/file>] [-v <version string>] [-p] [-b <path/to/build>]" 1>&2
    exit 1
}

# validates that environment file exists
validate_env() {
  if [ -f $1 ]; then
      echo "info: validated environment file $1"
      source ${1}
  else
      echo "error: environment file '$1' does not exist" 1>&2
      exit 1
  fi
}

# default values are null
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# aws credentials file
AWS_CREDENTIALS_FILENAME=~/.aws/credentials

# source default environment variables if present
if [ -f .env ]; then
  source .env
fi

# parse command line arguments
while getopts "e:" opt; do
  case ${opt} in
    e)
      e=${OPTARG}
      validate_env ${e}
      ;;
    \?)
      echo "error: invalid option '-$OPTARG'" 1>&2
      exit 1
      ;;
  esac
done

# ensure the correct variables are defined
if [ -z "${AWS_ACCESS_KEY_ID}" ] || [ -z "${AWS_SECRET_ACCESS_KEY}" ]; then
    echo "error: environment variables AWS_ACCESS_KEY_ID and/or AWS_SECRET_ACCESS_KEY are not defined" 1>&2
    echo "error: you can specify them through a .env file in the app root folder" 1>&2
    echo "error: or through another file specified with the -e option" 1>&2
    exit 1
fi

if [ ! -f ${AWS_CREDENTIALS_FILENAME} ]; then
  mkdir -p "$(dirname "${AWS_CREDENTIALS_FILENAME}")"
  touch "${AWS_CREDENTIALS_FILENAME}"
fi

# remove previous graasp credentials
sed -i -e '/\[graasp\]/{N;N;N;N;d;}' ${AWS_CREDENTIALS_FILENAME}

# append aws credentials
echo -e "[graasp]\naws_access_key_id = ${AWS_ACCESS_KEY_ID}\naws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}\n" >> ${AWS_CREDENTIALS_FILENAME}

echo "info: setup finalised successfully"
