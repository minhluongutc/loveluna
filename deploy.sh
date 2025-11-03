#!/bin/bash

# Build the Angular project with the specified output path and base href
ng build --output-path docs --base-href loveluna
echo "Build completed."

# Navigate to the output directory
mv docs/browser/* docs/
rm -rf docs/browser
echo "Moved build files to docs/ directory."

