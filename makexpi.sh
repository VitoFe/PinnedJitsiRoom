#!/bin/bash

# Get the name of the current directory
dirname=$(basename "$PWD")
# Create xpi
zip -r "$dirname.xpi" * -x "$0"
