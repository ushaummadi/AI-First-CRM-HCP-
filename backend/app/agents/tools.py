from langchain_core.tools import tool


@tool
def search_hcp(name: str):
    """Search doctor"""

    return f"{name} found in CRM."


@tool
def log_interaction(summary: str):
    """Log interaction"""

    return f"Interaction Logged: {summary}"


@tool
def edit_interaction(data: str):
    return "Interaction Updated."


@tool
def next_best_action(name: str):
    return f"Follow up with {name} next week."


@tool
def visit_summary(text: str):
    return f"Summary Generated:\n{text}"