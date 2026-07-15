from app.services.groq_service import llm
from app.services.crud_service import (
    get_latest_interaction,
    update_interaction
)


def edit_interaction(state):

    latest = get_latest_interaction()

    if not latest:
        state["response"] = "No interactions found."
        return state

    prompt = f"""
Extract ONLY the updated summary.

Message:

{state["message"]}
"""

    response = llm.invoke(prompt)

    summary = (
        response.content
        .replace("```", "")
        .replace('"', "")
        .strip()
    )

    update_interaction(
        latest.id,
        summary
    )

    state["response"] = "✅ Latest Interaction Updated Successfully"

    return state
