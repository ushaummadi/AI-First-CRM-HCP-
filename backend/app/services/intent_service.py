from app.services.groq_service import llm


def classify_intent(message: str):

    text = message.lower().strip()

    # Log Interaction
    if (
        "log interaction" in text
        or "log" in text
        or "visited" in text
        or "interaction type" in text
    ):
        return "log"

    # Edit Interaction
    if (
        "edit" in text
        or "update" in text
        or "modify" in text
    ):
        return "edit"

    # Summary
    if (
        "summary" in text
        or "summarize" in text
    ):
        return "summary"

    # Follow-up
    if (
        "follow" in text
        or "next action" in text
        or "recommend" in text
    ):
        return "follow"

    # Search
    if (
        "search" in text
        or "find" in text
        or text.startswith("dr ")
        or text.startswith("doctor ")
    ):
        return "search"

    return "search"
