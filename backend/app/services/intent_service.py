from app.services.groq_service import llm

def classify_intent(message: str):

    text = message.lower().strip()

    # Summary
    if "summary" in text:
        return "summary"

    # Search
    if (
        text.startswith("dr")
        or text.startswith("doctor")
        or "search" in text
        or "find" in text
    ):
        return "search"

    # Edit
    if "edit" in text or "update" in text:
        return "edit"

    # Follow-up
    if "follow" in text or "next action" in text:
        return "follow"

    # Log interaction
    if "visited" in text or "interaction type" in text:
        return "log"

    # Fallback
    return "search"

  