from app.services.groq_service import llm
from app.services.crud_service import get_hcp_by_name, save_interaction
import json


def log_interaction(state):

    prompt = f"""
You are an information extraction AI.

Extract the following fields from the user message.

Return ONLY valid JSON.

If any field is missing, return an empty string.

Example:

{{
  "doctor_name":"Dr. John",
  "interaction_type":"Visit",
  "summary":"Discussed CardioPlus",
  "products":"CardioPlus",
  "sentiment":"Positive",
  "next_action":"Follow up next week"
}}

User Message:
{state["message"]}
"""

    response = llm.invoke(prompt)

    print("========== LLM OUTPUT ==========")
    print(response.content)
    print("===============================")

    # Remove markdown code blocks if present
    content = response.content.strip()
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    print("========== CLEAN JSON ==========")
    print(content)
    print("===============================")

    try:
        data = json.loads(content)

        print("Parsed JSON:", data)

        doctor_name = data.get("doctor_name", "").strip()

        doctor = get_hcp_by_name(doctor_name)

        if doctor: 

            save_interaction(
                doctor.id,
                data.get("interaction_type", ""),
                data.get("summary", ""),
                data.get("products", ""),
                data.get("sentiment", ""),
                data.get("next_action", "")
            )

            state["response"] = "✅ Interaction Logged Successfully"

        else:

            state["response"] = f"❌ Doctor '{doctor_name}' not found."

    except Exception as e:

        print("JSON ERROR:", e)

        state["response"] = f"JSON Parse Error: {str(e)}"

    return state
