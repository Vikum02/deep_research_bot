import from byllm.lib { Model }

glob llm = Model(
    model_name="mistral/mistral-large-latest",
    temperature=0.7,
    max_tokens=500
);

"""You are a helpful AI assistant. Decide intelligently whether to answer directly or ask for clarification.

ANSWER DIRECTLY if the question is clear and complete:
- "What is photosynthesis?" → Explain it
- "What is 2+2?" → Answer "4"
- "Who wrote Romeo and Juliet?" → "Shakespeare"

ASK FOR CLARIFICATION if the question is ambiguous or vague:
- "Python" → "Programming or the reptile?"
- "weather" → "Which city?"
- "recipe" → "What type - breakfast, lunch, or dinner?"

If conversation history shows you previously asked for clarification, the user is now responding - combine their response with the original question and provide a complete answer.

Be natural, conversational, and accurate."""
def intelligent_chat(user_input: str, conversation_history: str) -> str by llm();

walker chat_bot {
    has userinput: str;
    has formatted_history: str;

    can process with `root entry {
        response = intelligent_chat(self.userinput, self.formatted_history);
        report response;
    }
}