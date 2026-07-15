from app.services.groq_service import llm


def recommend(state):

    prompt = f"""
Suggest next follow-up action.

{state["message"]}
"""

    response = llm.invoke(prompt)

    state["response"] = response.content

    return state