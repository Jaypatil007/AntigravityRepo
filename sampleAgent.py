## take this file as code reference on how to create a agent and deploy it for now we want to deploy it locally and use it later deploy it on cloud run


# pip install google-adk
# adk create my_agent

# my_agent/
#     agent.py      # main agent code
#     .env          # API keys or project IDs
#     __init__.py

from google.adk.agents.llm_agent import Agent

# Mock tool implementation
def get_current_time(city: str) -> dict:
    """Returns the current time in a specified city."""
    return {"status": "success", "city": city, "time": "10:30 AM"}

root_agent = Agent(
    model='gemini-3-pro-preview',
    name='root_agent',
    description="Tells the current time in a specified city.",
    instruction="You are a helpful assistant that tells the current time in cities. Use the 'get_current_time' tool for this purpose.",
    tools=[get_current_time],
)

# echo 'GOOGLE_API_KEY="YOUR_API_KEY"' > .env

# echo "from . import agent" > multi_tool_agent/__init__.py

# adk api_server 
# enables you to create a local FastAPI server in a single command, enabling you to test local cURL requests before you deploy your agent.


# Set the application URL¶
# Replace the example URL with the actual URL of your deployed Cloud Run service.


# export APP_URL="YOUR_CLOUD_RUN_SERVICE_URL"
# # Example: export APP_URL="https://adk-default-service-name-abc123xyz.a.run.app"
# Get an identity token (if needed)¶
# If your service requires authentication (i.e., you didn't use --allow-unauthenticated with gcloud or answered 'N' to the prompt with adk), obtain an identity token.


# export TOKEN=$(gcloud auth print-identity-token)
# If your service allows unauthenticated access, you can omit the -H "Authorization: Bearer $TOKEN" header from the curl commands below.

# List available apps¶
# Verify the deployed application name.


# curl -X GET -H "Authorization: Bearer $TOKEN" $APP_URL/list-apps
# (Adjust the app_name in the following commands based on this output if needed. The default is often the agent directory name, e.g., capital_agent).

# Create or Update a Session¶
# Initialize or update the state for a specific user and session. Replace capital_agent with your actual app name if different. The values user_123 and session_abc are example identifiers; you can replace them with your desired user and session IDs.


# curl -X POST -H "Authorization: Bearer $TOKEN" \
#     $APP_URL/apps/capital_agent/users/user_123/sessions/session_abc \
#     -H "Content-Type: application/json" \
#     -d '{"preferred_language": "English", "visit_count": 5}'
# Run the Agent¶
# Send a prompt to your agent. Replace capital_agent with your app name and adjust the user/session IDs and prompt as needed.


# curl -X POST -H "Authorization: Bearer $TOKEN" \
#     $APP_URL/run_sse \
#     -H "Content-Type: application/json" \
#     -d '{
#     "app_name": "capital_agent",
#     "user_id": "user_123",
#     "session_id": "session_abc",
#     "new_message": {
#         "role": "user",
#         "parts": [{
#         "text": "What is the capital of Canada?"
#         }]
#     },
#     "streaming": false
#     }'
# Set "streaming": true if you want to receive Server-Sent Events (SSE).
# The response will contain the agent's execution events, including the final answer.