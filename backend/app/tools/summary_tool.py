import re

from app.services.crud_service import get_interactions_by_doctor
from app.services.groq_service import llm


def summarize(state):

    text = state["message"]

    # Extract doctor name
    match = re.search(
        r"(?:with|for)\s+(.+)$",
        text,
        re.IGNORECASE
    )

    if match:
        name = match.group(1).strip()
    else:
        name = text.strip()

    print("Searching interactions for:", name)

    interactions = get_interactions_by_doctor(name)

    if not interactions:
        state["response"] = f"No interactions found for {name}."
        return state

    history = ""

    for item in interactions:
        history += f"""
Interaction Type: {item.interaction_type}
Summary: {item.summary}
Products: {item.products}
Sentiment: {item.sentiment}
Next Action: {item.next_action}

"""

    prompt = f"""
You are an AI CRM Assistant.

Read the following interaction history and generate a concise visit summary
in 4-5 bullet points.

Interaction History:

{history}
"""

    response = llm.invoke(prompt)

    state["response"] = response.content

    return state
