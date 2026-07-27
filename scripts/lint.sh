#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "Running black format check..."
black --check project/src project/tests

echo "Running flake8..."
flake8 project/src project/tests --max-line-length=100 --extend-ignore=E203,W503

echo "Running pytest..."
python -m pytest project/tests/ -v

echo "All checks passed."
