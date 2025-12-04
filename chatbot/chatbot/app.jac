import from byllm.lib { Model }

glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    temperature=0.4,
    max_tokens=300
);

"""Answer the user's current question, considering the previous conversation history for context. 
If the conversation history is empty, just answer the current question normally.
If there is conversation history, use it to understand context and provide better, more relevant answers.
IMPORTANT: Do not repeat or echo the conversation history in your response. Only provide a direct answer to the current question."""
def ask_llm(current_question: str, conversation_history: str) -> str by llm();

walker chat_agent {
    has userinput: str;
    has formatted_history: str;

    can chat with `root entry {
        response = ask_llm(self.userinput, self.formatted_history);
        report response;
    }
}

