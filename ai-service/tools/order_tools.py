import json
import httpx
from config import NODE_API_URL


def get_my_orders(auth_token=None, order_id=None):
    if not auth_token:
        return "The user is not logged in."

    try:
        r = httpx.get(
            f"{NODE_API_URL}/orders/me",
            cookies={"token": auth_token},
            timeout=10,
        )
    except httpx.RequestError:
        return "The order system is unavailable right now."

    if r.status_code == 401:
        return "The user's session is invalid or expired."
    if r.status_code != 200:
        return "Could not retrieve orders."

    data = r.json()
    orders = data if isinstance(data, list) else data.get("orders", [])
    orders = sorted(orders, key=lambda o: o.get("createdAt", ""), reverse=True)

    if order_id:
        orders = [o for o in orders if str(o.get("_id", "")).endswith(order_id)]
        if not orders:
            return f"No order matching '{order_id}' was found for this user."

    if not orders:
        return "This user has no orders."

    # send the model only what it needs (no email or phone)
    summary = [
        {
            "order_id": o.get("_id"),
            "status": o.get("status"),
            "quantity": o.get("quantity"),
            "created_at": o.get("createdAt"),
            "address": o.get("address"),
        }
        for o in orders[:5]
    ]
    return json.dumps(summary, ensure_ascii=False)