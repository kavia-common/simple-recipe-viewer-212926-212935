#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-recipe-viewer-212926-212935/recipe_app_frontend
npm run lint
ESLINT_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

