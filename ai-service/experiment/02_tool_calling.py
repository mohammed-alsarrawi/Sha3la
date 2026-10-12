from openai import OpenAI
import json

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_service_information",
            "description": "Get information about a specific Shu3la service.",
            "parameters": {
                "type": "object",
                "properties": {
                    "service_id": {
                        "type": "string",
                        "description": "The unique identifier of the service to retrieve information for",
                    },
                },
                "required": ["service_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_order_status",
            "description": "Get the status of a specific Shu3la order.",
            "parameters": {
                "type": "object",
                "properties": {
                    "order_id": {
                        "type": "string",
                        "description": "The unique identifier of the order to retrieve status for",
                    },
                },
                "required": ["order_id"],
            },
        },
    },
]

def get_service_information(service_id):
    return f"Service {service_id}: gas cylinder orders allowed between 1 and 10 units."

def get_order_status(order_id):
    return f"Order {order_id} is out for delivery."

messages = [{"role": "user", "content": "Where is my order 456?"}]

response = client.chat.completions.create(
    model="qwen2.5:7b",
    messages=messages,
    tools=tools,
)

response_message = response.choices[0].message
print("Raw model reply:")
print(response_message)

print("The question I originally sent:")
print(messages)

if response_message.tool_calls:
    tool_call = response_message.tool_calls[0]
    args = json.loads(tool_call.function.arguments)

    if tool_call.function.name == "get_service_information":
        result = get_service_information(args["service_id"])
    elif tool_call.function.name == "get_order_status":
        result = get_order_status(args["order_id"])

    messages.append(response_message)
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": result,
    })

    final_response = client.chat.completions.create(
        model="qwen2.5:7b",
        messages=messages,
    )
    print("\nFinal answer:")
    print(final_response.choices[0].message.content)
else:
    print("\nModel answered directly without calling a tool:")
    print(response_message.content)