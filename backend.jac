import from byllm.lib { Model }

# Configure the LLM model we want to use.
# For Gemini via LiteLLM, model_name can be e.g. "gemini-2.0-flash"
glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    temperature=0.3,  # keep it fairly factual / calm
    max_tokens=400
);

"""Simple backend function: takes a user message and returns an LLM reply."""
def chat_with_user(message: str) -> str by llm();

with entry {
    # Temporary test prompt – later this will come from frontend / MCP.
    test_message = "Hi, explain in simple English what a deep research bot does.";
    response = chat_with_user(test_message);
    print("User:", test_message);
    print("Bot:", response);
}
