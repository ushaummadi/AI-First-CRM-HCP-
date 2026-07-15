from app.services.groq_service import llm
from app.services.crud_service import update_interaction
import json

def edit_interaction(state):

    prompt = f"""
Extract ONLY JSON.

Example:

{{
    "interaction_id": 1,
    "summary": "Doctor requested product brochure"
}}

Message:

{state["message"]}
"""

    response = llm.invoke(prompt)

    content = response.content.strip()
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    try:

        data = json.loads(content)

        interaction = update_interaction(
            data["interaction_id"],
            data["summary"]
        )

        if interaction:

            state["response"] = "✅ Interaction Updated Successfully"

        else:

            state["response"] = "Interaction not found."

    except Exception as e:

        state["response"] = str(e)

    return state