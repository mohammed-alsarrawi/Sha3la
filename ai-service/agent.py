from openai import OpenAI
import json

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
MODEL = "qwen2.5:7b"

SYSTEM_PROMPT = """You are Shu3la's customer support assistant for a gas
distribution platform.

Rules:
- When a question is about a service, ALWAYS call get_service_information
  immediately. Infer the service from keywords:
  "cylinder", "cylinders", "gas bottle" -> gas_cylinder
  "refill", "tank filling", "liters" -> gas_filling
  "heating", "central heating", "maintenance", "inspection" -> heating
- When a question mentions an order number, ALWAYS call get_order_status immediately.
- Do NOT ask the user for clarification if you can reasonably infer the answer.
- Never describe a tool or say you "can use" it. Just call it.
- Only answer using tool results. If the tools don't contain the answer, say you don't have that information.
- Reply in the same language the user writes in."""

tools = [
    {
    "type": "function",
    "function": {
        "name": "get_service_information",
        "description": "Get rules and details for a Shu3la service. Use this for any question about ordering limits, requirements, or how a service works.",
        "parameters": {
            "type": "object",
            "properties": {
                "service": {
                    "type": "string",
                    "enum": ["gas_cylinder", "gas_filling", "heating"],
                    "description": "gas_cylinder = cylinder delivery orders; gas_filling = on-site tank refill; heating = central heating requests (inspection, installation, maintenance)",
                },
            },
            "required": ["service"],
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
                    "order_id": {"type": "string", "description": "The order identifier"},
                },
                "required": ["order_id"],
            },
        },
    },
]

def get_service_information(service):
    info = {
        "gas_cylinder": "Gas cylinder orders: 1 to 10 cylinders per order. Payment: pay on delivery or online.",
        "gas_filling": "Gas tank filling: minimum 200 liters. Customer chooses a date and an available time slot.",
        "heating": "Central heating requests: inspection, installation/inquiry, or maintenance.",
    }
    return info.get(service, "Unknown service.")

def get_order_status(order_id):
    return f"Order {order_id} is out for delivery."

# Maps tool name -> real function (replaces the if/elif chain)
TOOL_FUNCTIONS = {
    "get_service_information": get_service_information,
    "get_order_status": get_order_status,
}

def run_agent(user_message, history=None):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += history or []
    messages.append({"role": "user", "content": user_message})

    for _ in range(5):  # safety cap so it can never loop forever
        response = client.chat.completions.create(
            model=MODEL, messages=messages, tools=tools, temperature=0
        )
        msg = response.choices[0].message

        if not msg.tool_calls:
            return msg.content  # final answer

        messages.append(msg)
        for tool_call in msg.tool_calls:
            fn = TOOL_FUNCTIONS.get(tool_call.function.name)
            args = json.loads(tool_call.function.arguments)
            result = fn(**args) if fn else "Unknown tool"
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result,
            })

    return "Sorry, I couldn't complete that request."