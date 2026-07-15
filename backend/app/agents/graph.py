from langgraph.graph import StateGraph, END

from app.agents.state import AgentState

from app.tools.log_tool import log_interaction
from app.tools.edit_tool import edit_interaction
from app.tools.search_tool import search_hcp
from app.tools.summary_tool import summarize
from app.tools.followup_tool import recommend

from app.services.intent_service import classify_intent


def router(state):

    intent = classify_intent(state["message"])

    print("ROUTER INTENT:", intent)

    return intent


builder = StateGraph(AgentState)

builder.add_node("log", log_interaction)
builder.add_node("edit", edit_interaction)
builder.add_node("search", search_hcp)
builder.add_node("summary", summarize)
builder.add_node("follow", recommend)

builder.set_conditional_entry_point(
    router,
    {
        "log": "log",
        "edit": "edit",
        "search": "search",
        "summary": "summary",
        "follow": "follow",
    },
)

builder.add_edge("log", END)
builder.add_edge("edit", END)
builder.add_edge("search", END)
builder.add_edge("summary", END)
builder.add_edge("follow", END)

graph = builder.compile()