import os
from google.adk.agents.llm_agent import Agent

# Mock tool for SAP CPI Groovy Script generation (since we don't have the actual logic yet)
def generate_sap_cpi_groovy_script(requirement: str) -> dict:
    """Generates a SAP CPI Groovy script based on the requirement."""
    # In a real scenario, this would use an LLM or template to generate code.
    # For now, we'll return a placeholder script.
    script = f"""
import com.sap.gateway.ip.core.customdev.util.Message;
import java.util.HashMap;

def Message processData(Message message) {{
    // Generated script for: {requirement}
    
    // Body
    def body = message.getBody(java.lang.String.class);
    
    // Properties
    map = message.getProperties();
    
    // Logic here...
    
    return message;
}}
"""
    return {"status": "success", "script": script}

def pretty_print_content(content: str) -> dict:
    """Formats the content to be more readable/pretty."""
    # This is a mock for the 'pretty print' agent capability.
    # In reality, this might use an LLM to reformat text or code.
    return {"status": "success", "formatted_content": f"*** PRETTY PRINTED ***\n\n{content}\n\n**********************"}

# Main Agent for SAP CPI
sap_cpi_agent = Agent(
    model='gemini-1.5-pro-preview-0409', # Using a recent model
    name='sap_cpi_agent',
    description="Helps generate SAP CPI Groovy scripts.",
    instruction="You are an expert in SAP CPI and Groovy scripting. Help the user generate scripts.",
    tools=[generate_sap_cpi_groovy_script],
)

# Agent for Pretty Printing
pretty_print_agent = Agent(
    model='gemini-1.5-pro-preview-0409',
    name='pretty_print_agent',
    description="Formats text to be pretty and readable.",
    instruction="You are a formatter. Take the input and make it look pretty and structured.",
    tools=[pretty_print_content],
)

# We need to expose these agents. 
# The ADK usually runs one 'root' agent or a router. 
# For simplicity in this demo, we might need a router or just expose the SAP agent as root 
# and have the UI call a specific endpoint for pretty printing if the ADK supports it, 
# or we just make the SAP agent capable of pretty printing too.
# However, the requirement asked for a separate agent call.
# Let's make the root agent a router or just the SAP agent, and we can swap agents via API if ADK supports it.
# For this file, I will define 'agent' as the sap_cpi_agent for the default runner.

agent = sap_cpi_agent
