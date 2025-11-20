FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# The ADK likely provides a CLI or a way to run via uvicorn if we wrap it.
# Based on sampleAgent.py: "adk api_server"
# We will assume 'adk' is in the path.
# If adk is not in path, we might need to run the python module directly.
# For now, let's try to use the adk command as specified in the sample.

CMD ["adk", "api_server", "--host", "0.0.0.0", "--port", "8000"]
