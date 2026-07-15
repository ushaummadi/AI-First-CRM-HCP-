from app.services.crud_service import get_interactions_by_doctor
from app.services.groq_service import llm


def summarize(state):

    text = state["message"]

    name = (
        text.replace("summary", "")
            .replace("Summary", "")
            .replace("for", "")
            .strip()
    )

    interactions = get_interactions_by_doctor(name)

    if not interactions:
        state["response"] = "No interactions found."
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
Summarize these doctor interactions in 4-5 lines.

{history}
"""

    response = llm.invoke(prompt)

    state["response"] = response.content

    return state